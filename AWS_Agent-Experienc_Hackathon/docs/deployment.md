# AWS Deployment Guide for SkillPilot AI

This guide details deploying **SkillPilot AI** to AWS with minimal cost and overhead.

---

## Architecture Overview

- **Backend API**: Hosted on **AWS App Runner** (fully managed container service with automatic TLS and scaling).
- **Frontend SPA**: Hosted on **Amazon S3** static website hosting and accelerated globally via **Amazon CloudFront**.
- **Generative AI**: Serverless **Amazon Bedrock** (pay-per-token, zero idle compute costs).

---

## 1. Backend Deployment via AWS App Runner

### Step 1: Create Backend Dockerfile
`backend/Dockerfile`:
```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Step 2: Build & Push to Amazon ECR
```bash
# Authenticate Docker to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <YOUR_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com

# Create repository
aws ecr create-repository --repository-name skillpilot-backend

# Build, tag and push
docker build -t skillpilot-backend ./backend
docker tag skillpilot-backend:latest <YOUR_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/skillpilot-backend:latest
docker push <YOUR_ACCOUNT_ID>.dkr.ecr.us-east-1.amazonaws.com/skillpilot-backend:latest
```

### Step 3: Create App Runner Service
1. Go to AWS App Runner Console -> **Create Service**.
2. Source: **Container registry** -> Amazon ECR.
3. Select `skillpilot-backend:latest`.
4. Instance configuration: 1 vCPU, 2 GB RAM.
5. Environment variables:
   - `AWS_REGION`: `us-east-1`
   - `BEDROCK_MODEL_ID`: `anthropic.claude-3-5-sonnet-20241022-v2:0`
   - `APP_ENV`: `production`
6. Instance role: Attach an IAM role with Bedrock permissions (`bedrock:Converse`, `bedrock:InvokeModel`).

---

## 2. Frontend Deployment via Amazon S3 & CloudFront

### Step 1: Build Production Bundle
In `frontend/`:
```bash
npm run build
```
This generates the optimized bundle in `frontend/dist/`.

### Step 2: Sync to Amazon S3 Bucket
```bash
aws s3 mb s3://skillpilot-ai-frontend-<unique-id>
aws s3 sync frontend/dist/ s3://skillpilot-ai-frontend-<unique-id> --delete
```

### Step 3: Configure Amazon CloudFront
1. Create a CloudFront distribution pointing to the S3 bucket origin.
2. Enable **Origin Access Control (OAC)** to secure the bucket.
3. Set Default Root Object to `index.html`.
4. Configure Error Page: Map `404` and `403` to `/index.html` with HTTP 200 (for SPA client-side routing).
