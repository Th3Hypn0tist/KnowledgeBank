# KnowledgeBank

Deploy the repository root directly as the AIGM web directory /kb/. No copying individual subdirectories, flattening, or build step is required.

## Layout
- index.html — single HTML entry point
- llms.txt — machine-readable content discovery instructions for language models
- lib/bank.js — shared catalogue and recursive renderer
- style/bank.css — presentation extensions to /site.css
- bank/courses/index.json — course catalogue
- bank/courses/<id>/ — course JSON hierarchy and SVG assets
- bank/ — future knowledge categories (installation guides, documentation, etc.)

## Deployment
From an existing AIGM document root, for a new installation:

    git clone https://github.com/Th3Hypn0tist/KnowledgeBank.git kb

For an existing checkout, update from inside kb/ with git pull --ff-only. Alternatively extract the repository archive and rename its root directory to kb. The web server must deny access to .git and any non-public files. Do not overwrite the shared /site.css at the AIGM document root. If replacing an older deployment, remove obsolete files by replacing the old directory rather than merging archives; preserve any unrelated local data first.

The repository root and public /kb/ directory have identical layouts. Serve over HTTP; no external runtime dependencies.

## URLs
- /kb/
- /kb/?course=localfirst
- /kb/?course=localfirst&lang=en
- /kb/?course=localfirst#communication/primitives

## Content model
Each node directory contains index.json with localized title, optional description, ordered children (relative directory names), content (FI/EN arrays of blocks), and status. Blocks have title, paragraphs and optional image {src,alt,caption}. Image paths are relative to the JSON file. SVG assets are standalone. Explicit children arrays preserve ordering without directory listing. Status outline marks undeveloped topics.

New knowledge categories can be added under bank/; currently the renderer exposes courses only.
