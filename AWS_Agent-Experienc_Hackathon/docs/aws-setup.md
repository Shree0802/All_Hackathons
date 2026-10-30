# AWS Setup & Amazon Bedrock Configuration Guide

This guide covers configuring AWS credentials and enabling Amazon Bedrock models for **SkillPilot AI**.

---

## 1. Prerequisites
- An active AWS Account with administrative or Bedrock permissions.
- AWS CLI installed (`aws --version`).
- Python 3.10+ installed.

---

## 2. Requesting Model Access in Amazon Bedrock

1. Log in to the **AWS Management Console**.
2. Navigate to **Amazon Bedrock** (Region: `us-east-1` or your preferred region).
3. On the left navigation pane, select **Model access**.
4. Click **Manage model access** (or **Modify model access**).
5. Enable:
   - **Anthropic Claude 3.5 Sonnet** (`anthropic.claude-3-5-sonnet-20241022-v2:0`) or
   - **Amazon Nova Lite** (`amazon.nova-lite-v1:0`) / **Meta Llama 3.2**
6. Click **Save changes** and wait for access to show **Access granted**.

---

## 3. Recommended IAM Policy (Least Privilege)

Create an IAM policy named `SkillPilotBedrockAccessPolicy` attached to your development user or execution role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "BedrockInvokeAccess",
      "Effect": "Allow",
      "Action": [
        "bedrock:InvokeModel",
        "bedrock:Converse"
      ],
      "Resource": [
        "arn:aws:bedrock:*::foundation-model/anthropic.claude-3-5-sonnet-20241022-v2:0",
        "arn:aws:bedrock:*::foundation-model/amazon.nova-lite-v1:0",
        "arn:aws:bedrock:*::foundation-model/*"
      ]
    }
  ]
}
```

---

## 4. Configuring AWS Credentials Locally

### Option A: Standard AWS CLI Profile (Recommended)
Run:
```bash
aws configure
```
Provide:
- **AWS Access Key ID**: Your access key
- **AWS Secret Access Key**: Your secret key
- **Default region name**: `us-east-1`
- **Default output format**: `json`

### Option B: Environment Variables
Create a `.env` file in `backend/.env` (using `backend/.env.example` as a template):
```env
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-5-sonnet-20241022-v2:0
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
```
*(Never commit `.env` containing live secrets to GitHub).*

---

## 5. Running Strands Decider 2B

Strands Decider 2B is a System One decision model. It exposes a resident HTTP server implementing the `/v1/systemone` wire protocol.

### Option A: Running Local Decider Server
```bash
# Start local strands-decider server on port 8000
strands-decider serve --port 8000 StrandsAgents/strands-decider-2B-hobson-v19
```

### Option B: Built-in Demo Mode (Zero Model Weights Download Required)
If you do not have CUDA hardware or GPU resources to host local 2B model weights, SkillPilot AI provides an **Honest Demo Heuristic Engine**:
- Computes real calibrated confidence using the official Strands Decider formula: `(N*p_max - 1)/(N - 1)`.
- Flags all outputs transparently as `demo_heuristic_stub`.
- Never fabricates fake model success.
