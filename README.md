# KnowledgeBank

One HTML entry point and a shared vanilla JavaScript renderer for the complete knowledge bank. No HTML or executable code in individual course directories.

## Repository
- index.html: shared application shell.
- lib/course.js: catalogue and recursive course renderer.
- style/training.css: shared course presentation.
- courses/index.json: course catalogue.
- courses/<id>/index.json: course content root.
- Each child directory has index.json with localized title, optional description, ordered children (relative directory names), content (FI/EN blocks), and status.
- Blocks have title, paragraphs, and optional image {src,alt,caption}. Image paths are relative to their JSON file; standalone SVG files are content assets.

## Deployment at /kb/
Publish root index.html, lib/ and style/ directly into /kb/. Publish the contents of courses/ directly into /kb/ (including courses/index.json as /kb/index.json). Remove obsolete HTML files from course directories on the server. Do not overwrite the AIGM site-wide /site.css.

Catalogue: /kb/index.html
Course: /kb/index.html?course=localfirst
English: /kb/index.html?course=localfirst&lang=en
Topic: /kb/index.html?course=localfirst#communication/primitives

Serve over HTTP, including localhost. No build step, no external runtime dependencies. Explicit children arrays preserve ordering and avoid directory listing dependencies.
