# KnowledgeBank

Monolithic educational content repository.

## Courses

- Local-First: `courses/localfirst/` (FI/EN).

## AIGM deployment

- Publish `courses/index.html` as `/kb/index.html`.
- Publish `courses/<course-id>/` as `/kb/<course-id>/`.
- Publish `style/training.css` as `/kb/style/training.css`.
- All pages use the existing site-wide `/site.css` at the AIGM web root. KnowledgeBank does not own or overwrite it.
- Static HTML and inline SVG; no build step. For local preview reproduce these URL paths and supply the AIGM site.css at the local server root.
