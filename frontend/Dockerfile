# Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy source & build
COPY . .
RUN npm run build

# Runtime Stage
FROM node:20-alpine

WORKDIR /app

# Image Metadata
LABEL org.opencontainers.image.title="devops-joke-frontend"
LABEL org.opencontainers.image.description="Static React app serving DevOps jokes"
LABEL org.opencontainers.image.maintainer="krsumit449@gmail.com"

# Install minimal runtime deps
RUN npm install -g serve --silent

# Copy build artifacts
COPY --from=builder /app/build ./build

# Create a non-root user and give ownership
RUN addgroup -S app \
 && adduser -S app -G app \
 && chown -R app:app /app

USER app

# Expose port and add a simple healthcheck
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/ || exit 1

# Serve the build
CMD ["serve", "-s", "build", "-l", "3000"]
