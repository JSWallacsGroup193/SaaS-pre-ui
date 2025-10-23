#!/bin/bash
set -e  # Exit on any error

echo "🔨 Starting build process..."

# Store the root directory
ROOT_DIR=$(pwd)
echo "📁 Root directory: $ROOT_DIR"

# Build backend first (includes Prisma generation)
echo "📦 Building backend..."
cd "$ROOT_DIR/backend"

# Install dependencies (include dev dependencies for build tools)
echo "📥 Installing backend dependencies..."
npm ci --include=dev

# Explicitly generate Prisma Client with schema location
echo "🔄 Generating Prisma Client with deployment binaries..."
npx prisma generate --schema=./prisma/schema.prisma

# Build the backend
echo "🏗️ Building backend application..."
npm run build
echo "✅ Backend build complete"

# Build frontend
echo "📦 Building frontend..."
cd "$ROOT_DIR/frontend"
echo "📥 Installing frontend dependencies..."
npm ci
echo "🏗️ Building frontend application..."
npm run build
echo "✅ Frontend build complete"

echo "🎉 Build process completed successfully!"
