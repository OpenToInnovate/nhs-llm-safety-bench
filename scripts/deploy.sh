#!/bin/bash

# Deploy to GitHub Pages using gh-pages branch
echo "🚀 Deploying to GitHub Pages..."

# Build the project
echo "📦 Building project..."
npm run build

# Copy static files to root
echo "📁 Copying static files..."
cp -r out/* .

# Add all files
git add .

# Commit changes
git commit -m "Deploy to GitHub Pages - $(date)"

# Push to main branch (which serves GitHub Pages)
git push origin main

echo "✅ Deployment complete!"
echo "🌐 Site should be available at: https://opentoinnovate.github.io/nhs-llm-safety-bench/"
