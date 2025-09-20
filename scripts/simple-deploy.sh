#!/bin/bash

echo "🚀 Simple GitHub Pages Deployment"
echo "================================="

# Build the project
echo "📦 Building project..."
npm run build

# Copy static files to root
echo "📁 Copying static files to root..."
cp -r out/* .

echo "📄 Copying data files to public..."
cp data/results.json public/results.json
cp config/prompt.md public/prompt.md

# Add all files
echo "📝 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Deploy to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"

# Push to main branch
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your site should be available at:"
echo "   https://opentoinnovate.github.io/nhs-llm-safety-bench/"
echo ""
echo "⏰ Note: It may take 2-5 minutes for changes to appear on GitHub Pages"
