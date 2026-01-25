# Valid State Advisory Website

Personal website and microblog for Pete Woodhouse / Valid State Advisory Services.

**Live site:** https://validstateadvisory.com/

---

## Quick Links

- **📝 [How to Post](POSTING.md)** - Add new thoughts to your site
- **🔄 [Syndication Setup](MAKE-SETUP.md)** - Auto-post to X, LinkedIn, Threads
- **📡 [RSS Feed](https://validstateadvisory.com/feed.xml)** - Subscribe to updates

---

## Architecture

### Current Setup
- Single-page site with dynamic post loading
- Posts stored in `data/posts.json`
- RSS feed auto-generated via GitHub Actions
- Hosted on GitHub Pages with custom domain

### Design System
- **Fonts:** Fraunces (headings) + DM Sans (body)
- **Colors:** Dark slate palette with amber accent
- **Animations:** CSS keyframe animations on page load
- **Adaptive:** Auto-switches between light/dark mode

---

## Posting Workflow

### 1. Add a Post
Edit `data/posts.json` via GitHub web editor or locally:

```json
{
  "id": "2026-01-25-topic",
  "content": "Your thought here...",
  "date": "2026-01-25T09:30:00-08:00",
  "tags": ["tag1", "tag2"]
}
```

### 2. Automatic Processing
- Push to GitHub
- GitHub Action generates RSS feed
- Site updates within 1 minute
- Make.com syndicates to social platforms (if configured)

**Full details:** [POSTING.md](POSTING.md)

---

## Syndication (Optional)

Set up Make.com to automatically post to:
- X (Twitter)
- LinkedIn  
- Threads
- Others

**Setup guide:** [MAKE-SETUP.md](MAKE-SETUP.md)

**Cost:** Free (Make.com free tier: 1000 operations/month)

---

## Development

This is mostly static HTML with JavaScript for dynamic post loading.

**Local preview:**
```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

**Generate RSS manually:**
```bash
node generate-rss.js
```

---

## Deployment

Push to `main` branch → GitHub Pages auto-deploys to https://validstateadvisory.com/

---

## Files

```
├── index.html           # Main page (HTML + CSS + JS)
├── logo.svg             # Adaptive logo
├── pete.jpeg            # Headshot (real)
├── pete-ghibli.jpeg     # Headshot (Ghibli style)
├── data/
│   └── posts.json       # All your posts
├── generate-rss.js      # RSS generator script
├── feed.xml             # Generated RSS feed
├── .github/workflows/
│   └── generate-rss.yml # Auto-generates RSS on post updates
├── CNAME                # Custom domain config
├── POSTING.md           # How to add posts
├── MAKE-SETUP.md        # Syndication setup guide
└── README.md            # This file
```

---

## Features

✅ **Personal branding** - Ghibli hover effect, custom design  
✅ **Microblogging** - JSON-based, easy to update  
✅ **RSS feed** - Auto-generated on every post  
✅ **Auto-syndication** - Posts to social platforms via Make.com  
✅ **Light/dark mode** - Adapts to user preference  
✅ **Contact form** - Via Formsubmit (free)  
✅ **Mobile responsive** - Works on all devices  
✅ **Fast** - Static site, minimal dependencies  

---

## Roadmap

- [ ] Archive page for older posts
- [ ] Search/filter by tags
- [ ] Analytics integration
- [ ] Newsletter signup (optional)

