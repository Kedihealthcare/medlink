# MedLink Deployment Guide

This guide provides step-by-step instructions for deploying the MedLink application to various platforms.

## Prerequisites
- A GitHub repository with your source code.
- Docker installed locally (for testing).
- Accounts for your chosen hosting providers (Vercel, Railway, or AWS).

---

## 1. Local Deployment (Docker Compose)
To test the entire stack locally:
1. Ensure Docker is running.
2. Run `docker-compose up --build`.
3. Access the frontend at `http://localhost:3000` and backend at `http://localhost:5000`.

---

## 2. Hosting Options

### Option A: Vercel (Frontend) + Railway (Backend/Database)
**This is the recommended path for simplicity.**

#### Backend & Database (Railway)
1. **New Project**: Create a new project on Railway.
2. **PostgreSQL**: Add a PostgreSQL database to the project.
3. **Connect Backend**:
   - Link your GitHub repo to Railway.
   - select the `/backend` directory as the root.
   - Add environment variables from `.env.example`.
   - Railway will automatically detect the `Dockerfile` and deploy.
4. **Copy URL**: Copy the generated backend URL (e.g., `https://medlink-backend.up.railway.app`).

#### Frontend (Vercel)
1. **New Project**: Create a new project on Vercel.
2. **Connect Repo**: Select your repository.
3. **Configure**:
   - Set "Root Directory" to `frontend`.
   - Framework Preset: `Next.js`.
   - Add Environment Variable: `NEXT_PUBLIC_API_URL` = `https://your-backend-url/api`.
4. **Deploy**: Click Deploy.

---

### Option B: AWS (ECS + RDS)
**Best for scalability.**

1. **RDS**: Spin up a PostgreSQL instance.
2. **ECR**: Create two repositories: `medlink-frontend` and `medlink-backend`.
3. **Push Images**: Use the CI/CD pipeline (GitHub Actions) to build and push images to ECR.
4. **ECS**:
   - Create a Cluster.
   - Create Task Definitions using the images from ECR.
   - Set up an Application Load Balancer (ALB).
   - Launch Services for both frontend and backend.

---

## 3. Environment Variables Strategy
- **Never commit `.env` files.**
- Use `.env.example` as a template.
- Store secrets (JWT, DB Credentials) in the hosting provider's "Secrets" or "Environment Variables" section.

## 4. CI/CD Integration
The included `.github/workflows/deploy.yml` can be tailored to:
- Run tests on every PR.
- Automatically build and deploy to staging/production on merge to `main`.
