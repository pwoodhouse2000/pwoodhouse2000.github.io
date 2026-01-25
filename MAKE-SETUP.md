# Make.com Syndication Setup

This guide walks you through setting up automatic syndication from your RSS feed to social platforms using Make.com's free tier.

---

## Overview

**What you'll build:**
- RSS feed monitor → detects new posts
- Posts automatically to X (Twitter), LinkedIn, Threads
- Includes backlink to your site
- Runs on Make.com's free tier (1000 operations/month)

**Cost:** Free for up to 1000 operations/month
**Time to set up:** ~20 minutes

---

## Step 1: Create Make.com Account

1. Go to https://www.make.com/en/register
2. Sign up with email
3. Verify your account
4. Choose the **Free plan** (1000 operations/month)

---

## Step 2: Get API Keys for Each Platform

### X (Twitter)
1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create a new app (or use existing)
3. Get your API keys:
   - API Key
   - API Secret
   - Bearer Token
   - Access Token
   - Access Token Secret

### LinkedIn
1. Go to https://www.linkedin.com/developers/apps
2. Create a new app
3. Request "Share on LinkedIn" permission
4. Get Client ID and Client Secret
5. Generate Access Token

### Threads (Meta)
1. Threads uses Instagram API
2. Go to https://developers.facebook.com/
3. Create app with Instagram Basic Display
4. Get Access Token

---

## Step 3: Create Your First Scenario (X/Twitter)

1. **In Make.com, click "Create a new scenario"**

2. **Add RSS module:**
   - Search for "RSS"
   - Choose "Watch RSS feed items"
   - RSS feed URL: `https://validstateadvisory.com/feed.xml`
   - Set to run every 15 minutes

3. **Add Twitter module:**
   - Search for "Twitter"
   - Choose "Create a Tweet"
   - Connect your Twitter account (use API keys from Step 2)
   - Tweet text template:
     ```
     {{content}}
     
     Read more: https://validstateadvisory.com#{{guid}}
     ```

4. **Test it:**
   - Click "Run once"
   - Check that it finds your RSS feed
   - Verify the tweet format looks good

5. **Activate:**
   - Click "Scheduling" at bottom
   - Turn ON
   - Save scenario as "RSS → Twitter"

---

## Step 4: Duplicate for LinkedIn

1. **Duplicate your scenario:**
   - Click the three dots → Duplicate

2. **Replace Twitter module with LinkedIn:**
   - Delete Twitter module
   - Add "LinkedIn" → "Create a Share"
   - Connect LinkedIn account
   - Post text template:
     ```
     {{content}}
     
     {{#each tags}}#{{this}} {{/each}}
     
     Read more: https://validstateadvisory.com#{{guid}}
     ```

3. **Test and activate**

---

## Step 5: Duplicate for Threads

1. **Duplicate scenario again**

2. **Replace with Threads/Instagram:**
   - Delete previous module
   - Add "Instagram" → "Create a Media Container"
   - Then "Instagram" → "Publish Media Container"
   - Use same text template

3. **Test and activate**

---

## Step 6: Add Filtering (Optional but Recommended)

To avoid re-posting old items:

1. **In each scenario, add a filter after RSS module:**
   - Click the wrench icon between modules
   - Add condition: `Published Date` → `is after` → `[Date of your first post]`
   - This prevents syndicating old posts

---

## Scenario Templates

### Basic RSS → X Template
```
[RSS Watch Feed] 
  → [Filter: Only new items] 
  → [X: Create Tweet]
```

### Advanced Template (with error handling)
```
[RSS Watch Feed]
  → [Filter: Only new items]
  → [Router]
     ├─ [X: Create Tweet]
     │   └─ [Error Handler: Email you if fails]
     ├─ [LinkedIn: Create Share]
     │   └─ [Error Handler: Email you if fails]
     └─ [Threads: Create Post]
         └─ [Error Handler: Email you if fails]
```

---

## Post Format Examples

### For X (280 chars limit):
```
{{content}}

→ https://validstateadvisory.com#{{guid}}
```

### For LinkedIn (longer form):
```
{{content}}

Tags: {{#each tags}}#{{this}} {{/each}}

Read more and connect: https://validstateadvisory.com#{{guid}}
```

### For Threads:
```
{{content}}

{{#each tags}}#{{this}} {{/each}}

🔗 validstateadvisory.com
```

---

## Testing Your Setup

1. **Add a test post** to `data/posts.json`:
   ```json
   {
     "id": "2026-01-25-test",
     "content": "Testing my automated syndication setup. If you see this on X, LinkedIn, and Threads, it worked!",
     "date": "2026-01-25T15:00:00-08:00",
     "tags": ["test"]
   }
   ```

2. **Wait 15-30 minutes** for:
   - GitHub Action to generate RSS
   - Make.com to check RSS (runs every 15 min)

3. **Check each platform** to verify posts appeared

4. **Remove test post** from JSON if desired

---

## Monitoring & Limits

### Make.com Free Tier:
- 1000 operations/month
- Each scenario check = 1 operation
- Each post = 1 operation per platform

**Typical usage:**
- RSS checks: 4/hour × 24 × 30 = ~2,880/month
- But Make.com only counts when data changes
- If you post 2x/week = ~8 posts/month = ~24 operations

**You'll be well within limits!**

### View usage:
- Make.com dashboard → Organization → Usage

---

## Troubleshooting

**RSS not found:**
- Verify `feed.xml` exists at root of your site
- Check GitHub Action ran successfully

**Posts not syndicating:**
- Check Make.com scenario history for errors
- Verify API keys are valid
- Check platform rate limits

**Duplicate posts:**
- Add filter for "only new items" after RSS module
- Use "Published Date" condition

---

## Next Steps

Once working:
1. Monitor for a week to ensure reliability
2. Adjust posting schedules if needed
3. Add more platforms (Mastodon, Bluesky, etc.)
4. Set up email notifications for errors

---

## Support

- Make.com docs: https://www.make.com/en/help
- X API docs: https://developer.twitter.com/en/docs
- LinkedIn API: https://learn.microsoft.com/en-us/linkedin/
