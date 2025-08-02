# Build Stage 
FROM python:3.11-slim AS builder

# Avoid writing .pyc, buffer logs straight to console
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install build deps
RUN apt-get update \
 && apt-get install --no-install-recommends -y build-essential \
 && rm -rf /var/lib/apt/lists/*

# Cache and install dependencies
COPY requirements.txt .
RUN pip install --upgrade pip \
 && pip install --no-cache-dir --prefix=/install -r requirements.txt

# Runtime Stage
FROM python:3.11-slim

# Image Metadata
LABEL org.opencontainers.image.title="devops-joke-backend"
LABEL org.opencontainers.image.description="Python app serving DevOps jokes"
LABEL org.opencontainers.image.maintainer="krsumit449@gmail.com"

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH=/install/bin:$PATH

WORKDIR /app

# Copy only installed packages and our app code
COPY --from=builder /install /usr/local
COPY main.py .  

# Create a non-root user for security
RUN addgroup --system app \
 && adduser --system --ingroup app app \
 && chown -R app:app /app

USER app

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
