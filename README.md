# KnowledgeBank

Deploy the repository root directly as the AIGM web directory /kb/. No copying individual subdirectories, flattening, or build step is required.

## Layout
- index.html — single HTML entry point
- api/index.php — read-only REST API (PHP 7.4+)
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

## REST API

GET /kb/api/ — discovery
GET /kb/api/sitemap — full tree
GET /kb/api/sitemap/courses/localfirst — course subtree
GET /kb/api/node/courses/localfirst — one node
GET /kb/api/node/courses/localfirst/communication/primitives/channel — one topic

Apache requires mod_rewrite and AllowOverride FileInfo Indexes (or equivalent server configuration). Alternatively route /kb/api/* to api/index.php preserving REQUEST_URI, or use index.php/sitemap and index.php/node/<path> if PHP PATH_INFO is supported. PHP 7.4+; no dependencies or database. Static UI remains independent. Sitemap omits lesson paragraphs, preserves child order, includes all maturity states; count includes category catalogues. Node response contains original JSON under data and an absolute source URL for relative image resolution. Discovery links, root, api and source fields use the fixed PUBLIC_BASE constant (https://aigm.fi/kb); configure this for another deployment. Logical path and original bank image references remain relative. Only GET is accepted. Paths are restricted to published index.json nodes under bank/; no arbitrary file access or writes. Do not store private data under public bank/. Production assumes /kb/ deployment.

## Crawler discovery

- /kb/sitemap.xml — standard XML sitemap generated from published JSON nodes, excluding outline and draft. API nodes are the chosen canonical machine-readable content URLs.
- /kb/sitemap.html — live HTML directory with absolute clickable API links for all nodes, including unfinished topics. No separate lesson pages or stored index.
- /kb/api/sitemap — full JSON hierarchy, including unfinished nodes.
- /kb/llms.txt — bot retrieval instructions.
- robots.txt in this repository is a scoped merge template for the **host root** /robots.txt, not a separately effective robots policy at /kb/robots.txt. Merge its Sitemap line and relevant rules into existing site policy; preserve other site rules and explicit crawler groups. Do not overwrite the host file blindly. Robots rules are advisory, not access control. Deny nonpublic files at the web server.

Root .htaccess routes sitemap.xml and sitemap.html to the existing API; Apache mod_rewrite and AllowOverride FileInfo are required (or equivalent routing preserving REQUEST_URI). Sitemaps aid discovery, not guaranteed indexing; JSON indexing depends on crawler support. All views read the same bank hierarchy.

## Release validation

From the repository root:

    python3 developement/validate.py --api
    node --check lib/bank.js

The validator uses the Python standard library and optionally PHP CLI. It checks the release hierarchy, paired content blocks, SVG XML and references, all individual API responses and sitemap coverage, plus negative API cases. It assumes a completed Local-First release and the canonical aigm.fi deployment URLs. It does not establish visual rendering, semantic translation quality, Apache production configuration or completion of the instructional exercises. The root .htaccess also denies HTTP access to .git and developement when Apache rewrite rules are enabled. See developement/REVIEW.md for scope and evidence.
