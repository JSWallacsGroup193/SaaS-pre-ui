#!/bin/bash
set -e  # Exit on any error

echo "🔨 Starting build process..."

# Store the root directory
ROOT_DIR=$(pwd)
echo "📁 Root directory: $ROOT_DIR"

# Build frontend
echo "📦 Building frontend..."
cd "$ROOT_DIR/frontend"
npm ci
npm run build
echo "✅ Frontend build complete"

# Build backend
echo "📦 Building backend..."
cd "$ROOT_DIR/backend"
npm ci
npm run build
echo "✅ Backend build complete"

echo "🎉 Build process completed successfully!"
