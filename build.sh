#!/bin/bash
set -e  # Exit on any error

echo "🔨 Starting build process..."

# Store the root directory
ROOT_DIR=$(pwd)
echo "📁 Root directory: $ROOT_DIR"

# Build backend first (includes Prisma generation)
echo "📦 Building backend..."
cd "$ROOT_DIR/backend"

# Install dependencies (production mode)
echo "📥 Installing backend dependencies..."
npm ci --include=dev

# Explicitly generate Prisma Client with deployment binaries
echo "🔄 Generating Prisma Client with deployment binaries..."
npx prisma generate

# Build the backend
echo "🏗️ Building backend application..."
npm run build
echo "✅ Backend build complete"

# Build frontend
echo "📦 Building frontend..."
cd "$ROOT_DIR/frontend"
npm ci
npm run build
echo "✅ Frontend build complete"

echo "🎉 Build process completed successfully!"
