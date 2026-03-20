import os
import logging
import pandas as pd
from datasets import load_dataset
from sqlalchemy import create_engine, text

# We use sentence-transformers for lightning-fast localized semantic embeddings
try:
    from sentence_transformers import SentenceTransformer
except ImportError:
    logger.error("Missing dependency. Please run: pip install sentence-transformers")

# -------------------------------------------------------------------
# SETUP & CONFIG
# -------------------------------------------------------------------
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

DATABASE_URI = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/medlink")

# Using 'pgvector' natively via raw SQLAlchemy Text execution
engine = create_engine(DATABASE_URI)

# Initialize open-source Embedding Model (Hugging Face ecosystem)
# 'all-MiniLM-L6-v2' produces extremely high-quality 384-dimensional dense vectors 
# much faster and at zero-cost compared to OpenAI endpoints.
logger.info("Initializing SentenceTransformer semantic model...")
embedder = SentenceTransformer('all-MiniLM-L6-v2')


class SemanticEmbeddingPipeline:
    def __init__(self, hf_dataset: str):
        self.hf_dataset = hf_dataset
        self.df = None

    def initialize_pgvector(self):
        """Prepares the PostgreSQL instance for deep Vector storage natively."""
        logger.info("Activating 'pgvector' extension on active PostgreSQL cluster...")
        with engine.connect() as conn:
            conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))
            
            # Create Table overriding Prisma exclusively for the 384-dimension vector type
            conn.execute(text("""
                CREATE TABLE IF NOT EXISTS "MedicalKnowledgeBase" (
                    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                    question TEXT,
                    context TEXT,
                    answer TEXT,
                    embedding vector(384)
                );
            """))
            conn.commit()

    def fetch_and_clean(self):
        """Pulls the raw Medical Question Answering pairs."""
        logger.info(f"Downloading Semantic Q&A knowledge target: {self.hf_dataset}")
        dataset = load_dataset(self.hf_dataset, split="train[:5000]") # Capped for sample-size speed
        self.df = dataset.to_pandas()
        
        # Purge useless rows
        self.df.dropna(subset=['question', 'answer'], inplace=True)
        
    def generate_embeddings_and_store(self):
        """Fires the LLM Embedding Encoder and batches vectors to the DB."""
        logger.info(f"Generating dense vectors for {len(self.df)} Medical Q&A records...")
        
        # We embed the concatenated "Question + Context" to optimally match fuzzy User Queries
        texts_to_embed = (self.df['question'] + " " + self.df.get('context', '')).tolist()
        
        # CPU/GPU intensive localized encoding array
        embeddings = embedder.encode(texts_to_embed, batch_size=64, show_progress_bar=True)
        
        logger.info("Executing Batch Vector Inserts directly into pgvector...")
        
        with engine.begin() as conn:
            for i, row in self.df.iterrows():
                # Convert numpy array specifically to Python list for SQL string casting
                embedding_list = embeddings[i].tolist()
                
                query = text("""
                    INSERT INTO "MedicalKnowledgeBase" (question, context, answer, embedding) 
                    VALUES (:q, :c, :a, :embed)
                """)
                
                conn.execute(query, {
                    "q": row['question'],
                    "c": row.get('context', ''),
                    "a": row['answer'],
                    "embed": str(embedding_list) # pgvector string cast protocol
                })
                
        logger.info("✅ Semantic Knowledge Base fully embedded and active inside PostgreSQL!")

    def run(self):
        self.initialize_pgvector()
        self.fetch_and_clean()
        self.generate_embeddings_and_store()

if __name__ == "__main__":
    # We utilize 'medalpaca' for premium, verified medical QA paragraph pairs
    pipeline = SemanticEmbeddingPipeline("medalpaca/medical_meadow_wikidoc")
    pipeline.run()
