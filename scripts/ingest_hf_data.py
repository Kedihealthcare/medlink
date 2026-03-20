import os
import uuid
import logging
import pandas as pd
from datasets import load_dataset
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager

# -------------------------------------------------------------------
# SETUP & LOGGING CONFIGURATION
# -------------------------------------------------------------------
logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(levelname)s - [%(module)s] - %(message)s'
)
logger = logging.getLogger(__name__)

DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/medlink")
engine = create_engine(DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@contextmanager
def db_transaction():
    """Robust context manager for ensuring ACID compliant fallback during bad inserts."""
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        logger.error(f"Transaction failed. Rolling back database: {e}")
        raise
    finally:
        session.close()


# -------------------------------------------------------------------
# REUSABLE PIPELINE CLASS
# -------------------------------------------------------------------
class HuggingFaceETLPipeline:
    def __init__(self, dataset_slug: str, split: str = "train"):
        self.dataset_slug = dataset_slug
        self.split = split
        self.df = None

    def fetch_data(self):
        """1. Download Dataset safely from Hugging Face hub."""
        logger.info(f"Initializing connection to Hugging Face: '{self.dataset_slug}'...")
        try:
            dataset = load_dataset(self.dataset_slug, split=self.split)
            self.df = dataset.to_pandas()
            logger.info(f"Successfully connected and loaded {len(self.df)} raw records into memory.")
        except Exception as e:
            logger.error(f"Failed to pull dataset from Hugging Face: {e}")
            raise

    def clean_and_transform(self):
        """2. Clean & 3. Transform Data into Structured Forms."""
        logger.info("Executing normalization and cleaning algorithms...")
        if self.df is None or self.df.empty:
            logger.critical("Dataframe is utterly empty. Halting operation.")
            return

        # Verification of schema integrity
        if 'symptom' not in self.df.columns or 'disease' not in self.df.columns:
            logger.critical("Dataset corrupted: Missing required 'symptom' or 'disease' schema columns.")
            raise ValueError("Invalid schema structure from remote source.")

        # Transformation: Strip whitespace and format to rigorous lowercase bounds
        self.df['symptom'] = self.df['symptom'].str.lower().str.strip()
        self.df['disease'] = self.df['disease'].str.lower().str.strip()

        # Error Handling: Scuttling bad records natively
        initial_length = len(self.df)
        self.df.dropna(subset=['symptom', 'disease'], inplace=True)
        self.df.drop_duplicates(subset=['symptom', 'disease'], inplace=True)
        dropped_count = initial_length - len(self.df)
        
        if dropped_count > 0:
            logger.warning(f"Purged {dropped_count} corrupted or duplicated records from the pipe.")

        # Standardization: Alias Mapping
        alias_map = {
            "high temperature": "fever",
            "belly ache": "abdominal pain",
            "tiredness": "fatigue",
            "pounding heart": "palpitations"
        }
        self.df['symptom'] = self.df['symptom'].replace(alias_map)
        logger.info("Lexical mapping standardizations successfully applied.")

    def load_to_postgresql(self, batch_size=500):
        """4. Batch Insert Strategy aggressively into PostgreSQL via SQLAlchemy."""
        logger.info(f"Targeting Database URI: {DATABASE_URI[:20]}***")
        logger.info(f"Initiating fast batch insert strategy (chunksize={batch_size})...")
        
        # Safely bridge into Prisma compatibility by generating unique UUID primary keys
        unique_symptoms = pd.DataFrame({
            'id': [str(uuid.uuid4()) for _ in range(self.df['symptom'].nunique())],
            'name': self.df['symptom'].unique()
        })
        
        try:
            # Multi-insertion method dramatically faster than singular looping
            unique_symptoms.to_sql(
                name='Symptom', 
                con=engine, 
                if_exists='append', 
                index=False,
                chunksize=batch_size,
                method='multi' 
            )
            logger.info(f"SUCCESS: Injected {len(unique_symptoms)} unique Symptoms natively into the Prisma Schema.")
        except Exception as e:
            logger.error(f"Catastrophic failure during batch SQL insert: {e}")
            logger.info("Check PostgreSQL instance connectivity or unique constraints.")
            
    def run(self):
        """Wrapper to execute entire reusable pipeline linearly."""
        self.fetch_data()
        self.clean_and_transform()
        self.load_to_postgresql()

# -------------------------------------------------------------------
# KICKSTART
# -------------------------------------------------------------------
if __name__ == "__main__":
    logger.info("=== MedLink Hugging Face Intelligence Ingester ===")
    pipeline = HuggingFaceETLPipeline("Qiliang/sym2dis")
    pipeline.run()
