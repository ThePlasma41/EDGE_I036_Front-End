# Deploying TaskBoard to Vercel

## Prerequisites
- A [Vercel](https://vercel.com) account (free tier is fine)
- Your project pushed to a public GitHub repository

## Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: initial TaskBoard setup"
   git remote add origin https://github.com/YOUR_USERNAME/taskboard.git
   git push -u origin main
   ```

2. **Import on Vercel**
   - Go to https://vercel.com/new
   - Click **Import** next to your `taskboard` repository
   - Framework preset will auto-detect as **Vite**

3. **Build settings** (auto-detected — no changes needed)
   | Setting | Value |
   |---------|-------|
   | Framework | Vite |
   | Build Command | `npm run build` |
   | Output Directory | `dist` |

4. **Deploy** — click **Deploy** and wait ~1 minute.

5. **Copy your live URL** (e.g. `https://taskboard-abc123.vercel.app`) and add it to your README.

## Redeploying
Every `git push` to `main` auto-triggers a new deployment.
