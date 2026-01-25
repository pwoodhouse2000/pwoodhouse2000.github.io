# Valid State Advisory Website

Personal website and microblog for Pete Woodhouse / Valid State Advisory Services.

**Live site:** https://validstateadvisory.com/

## Architecture

### Current Setup
- Single-page static site hosted on GitHub Pages
- Custom domain via CNAME
- All CSS inline in `index.html` for simplicity

### Design System
- **Fonts:** Fraunces (headings) + DM Sans (body)
- **Colors:** Dark slate palette with amber accent
- **Animations:** CSS keyframe animations on page load

## Microblog / Notes

The site includes a "Notes" section designed for short-form posts (similar to Simon Willison's TIL).

### Adding Posts Manually

Edit `index.html` and add new `.note` articles inside `.notes__list`:

```html
<article class="note">
    <div class="note__content">
        <p>Your post content here. <a href="https://example.com">Links</a> work too.</p>
    </div>
    <footer class="note__meta">
        <time class="note__date" datetime="2026-01-25">Jan 25, 2026</time>
        <div class="note__tags">
            <span class="note__tag">#topic</span>
        </div>
    </footer>
</article>
```

### Future: Dynamic Posts

The HTML includes commented-out JavaScript for loading posts from JSON. To enable:

1. Create `/data/posts.json`:
```json
{
  "posts": [
    {
      "id": "2026-01-24-1",
      "content": "Post content here...",
      "date": "2026-01-24T10:30:00Z",
      "tags": ["ai", "leadership"],
      "syndication": {
        "twitter": "https://twitter.com/...",
        "linkedin": "https://linkedin.com/..."
      }
    }
  ]
}
```

2. Uncomment the `<script>` block at the bottom of `index.html`

### Future: Syndication to Social Platforms

Options for POSSE (Publish Own Site, Syndicate Elsewhere):

1. **RSS + IFTTT/Zapier** - Generate `/feed.xml`, use automation to post to X/LinkedIn/Threads
2. **Micro.blog** - Paid service that handles cross-posting elegantly
3. **Custom GitHub Actions** - On push, parse new posts and call social APIs
4. **n8n or Make** - Self-hosted automation workflows

Recommended approach: Add RSS feed generation, then use Zapier or n8n for syndication.

## Development

This is a static HTML file - just open `index.html` in a browser or use:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

## Deployment

Push to `main` branch → GitHub Pages auto-deploys to https://validstateadvisory.com/

## Files

```
├── index.html      # Main page (HTML + CSS)
├── logo.png        # Company logo
├── CNAME           # Custom domain config
├── README.md       # This file
└── data/           # Future: posts.json
    └── posts.json
```
