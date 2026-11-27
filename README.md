# KnowledgeBank

Monolithic educational content repository. Courses are data, rendered by one shared vanilla JavaScript runtime.

## Course structure
Each directory contains index.json with localized title, optional description, content (FI/EN arrays of blocks), and ordered children (relative directory names). A block has title, paragraphs and optional image {src,alt,caption}. Image paths are relative to the containing JSON file. SVG images are standalone and editable. Status outline means the topic has no developed lesson yet.

The browser uses explicit children arrays because static HTTP does not expose a portable directory enumeration API. Add a child directory and its ID to the parent index.json. No build or third-party dependencies.

## AIGM deployment
- Publish courses/index.html as /kb/index.html.
- Publish courses/<course-id>/ recursively as /kb/<course-id>/.
- Publish lib/ as /kb/lib/ and style/ as /kb/style/.
- Existing /site.css at web root is shared, not owned by KnowledgeBank.
- Serve over HTTP (including localhost); fetch of JSON under file:// is not supported by typical browsers.
- Remove obsolete course HTML pages from deployment; course entry is index.html; language is ?lang=en; headings use hash paths.
