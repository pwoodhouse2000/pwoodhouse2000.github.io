# How to Post to Your Site

## Quick Method: GitHub Web Editor (2 minutes)

1. **Go to your posts file:**
   - Visit: https://github.com/pwoodhouse2000/pwoodhouse2000.github.io/blob/main/data/posts.json
   
2. **Click the pencil icon** (Edit this file)

3. **Add your new post** at the TOP of the posts array:
   ```json
   {
     "posts": [
       {
         "id": "2026-01-25-your-topic",
         "content": "Your thought here. Can be multiple sentences. Links work too.",
         "date": "2026-01-25T09:30:00-08:00",
         "tags": ["leadership", "ai"]
       },
       ... existing posts below ...
     ]
   }
   ```

4. **Important formatting:**
   - `id`: Use format `YYYY-MM-DD-short-slug`
   - `content`: Your actual text (escape quotes with backslash if needed)
   - `date`: Use ISO format with timezone (e.g., `-08:00` for Pacific)
   - `tags`: Array of topics (optional)

5. **Commit the change:**
   - Scroll down
   - Add commit message like "Add thought about X"
   - Click "Commit changes"

6. **What happens automatically:**
   - GitHub Action runs and generates RSS feed (~30 seconds)
   - Your site updates with the new post
   - Make.com detects the RSS update and syndicates (if configured)

---

## Alternative: Local Editing

If you prefer to work locally:

```bash
cd "/Users/pete/SOFTWARE REPO/ValidState/pwoodhouse2000.github.io"

# Edit data/posts.json in your editor
# Then:

git add data/posts.json
git commit -m "Add new thought"
git push
```

---

## Post Template

Copy this for each new post:

```json
{
  "id": "2026-MM-DD-topic-slug",
  "content": "Your thought here.",
  "date": "2026-MM-DDTHH:MM:SS-08:00",
  "tags": ["tag1", "tag2"]
}
```

---

## Tips

- **Keep it concise:** 1-3 sentences work best for microblogging
- **Post regularly:** Even one thought per week builds momentum
- **Use tags consistently:** They help categorize and can be used in syndication
- **Include links:** Just use full URLs in your content text
- **Timing:** Use your actual local time in the date field for accurate timestamps

---

## Syndication

Once Make.com is configured (see MAKE-SETUP.md), posts will automatically appear on:
- X (Twitter)
- LinkedIn
- Threads
- Any other platforms you configure

Each syndicated post will include a backlink to validstateadvisory.com
