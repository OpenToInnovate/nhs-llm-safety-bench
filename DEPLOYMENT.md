# GitHub Pages Deployment Guide

## 🚀 Quick Deployment (No GitHub Actions Required)

Since GitHub Actions is having permission issues, we'll use a simple manual deployment approach.

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/OpenToInnovate/nhs-llm-safety-bench
2. Click **Settings** (in the repository menu)
3. Scroll down to **Pages** (in the left sidebar)
4. Under **Source**, select **"Deploy from a branch"**
5. Select **"main"** as the branch
6. Select **"/ (root)"** as the folder
7. Click **Save**

### Step 2: Deploy the Site

Run this command in your local repository:

```bash
npm run deploy
```

This will:
- Build the Next.js project
- Copy static files to the repository root
- Commit and push changes to GitHub
- Deploy to GitHub Pages

### Step 3: Verify Deployment

Your site will be available at:
**https://opentoinnovate.github.io/nhs-llm-safety-bench/**

## 🔄 Updating the Site

Whenever you make changes, simply run:

```bash
npm run deploy
```

## 🛠️ Manual Deployment Steps

If the npm script doesn't work, you can run these commands manually:

```bash
# Build the project
npm run build

# Copy static files to root
cp -r out/* .

# Add files to git
git add .

# Commit changes
git commit -m "Update site - $(date)"

# Push to GitHub
git push origin main
```

## ❌ Troubleshooting

### If the site shows 404:
1. Wait 5-10 minutes for DNS propagation
2. Try accessing with trailing slash: `/nhs-llm-safety-bench/`
3. Check that GitHub Pages is enabled in repository settings

### If you get permission errors:
1. Make sure you have push access to the repository
2. Check that the repository is public (required for free GitHub Pages)

### If the site loads but looks broken:
1. Check browser console for errors
2. Ensure all static files were copied to root
3. Try running `npm run deploy` again

## ✅ Success Indicators

- Site loads at the GitHub Pages URL
- All pages (/, /chat, /bench) work correctly
- Chat interface accepts API key input
- Benchmark results display properly
