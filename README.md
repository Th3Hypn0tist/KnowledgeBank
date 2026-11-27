# KnowledgeBank

One HTML entry point and a shared vanilla JavaScript renderer for the complete knowledge bank. No HTML or executable code in individual course directories.

## Repository
- index.html: shared application shell.
- lib/course.js: catalogue and recursive course renderer.
- style/training.css: shared presentation.
- courses/index.json: course catalogue.
- courses/<id>/index.json: course content root.
- Each child directory has index.json with localized title, optional description, ordered children (relative directory names), content (FI/EN blocks), and status.
- Blocks have title, paragraphs, and optional image {src,alt,caption}. Image paths are relative to their JSON file; standalone SVG files are content assets.

## AIGM deployment

The repository is published under /kb/bank/ intact, including README.md and courses/. The public entry point is /kb/index.html. Copy the repository's index.html to /kb/index.html, lib/ to /kb/lib/ and style/ to /kb/style/. Course data is read directly from /kb/bank/courses/index.json. Do not overwrite the AIGM site-wide /site.css.

Catalogue: /kb/index.html
Course: /kb/index.html?course=localfirst
English: /kb/index.html?course=localfirst&lang=en
Topic: /kb/index.html?course=localfirst#communication/primitives

Serve over HTTP, including localhost. No build step, no external runtime dependencies. Explicit children arrays preserve ordering and avoid directory listing dependencies. Other knowledge categories, including installation guides, may be added alongside courses/ under bank/; their UI integration is not yet implemented.

Ensure server access rules prohibit HTTP access to .git and any secrets or non-public files. Remove obsolete course HTML pages from earlier deployments.
