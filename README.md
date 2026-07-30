# Fong Tsz_ho's harbor

Fong Tsz_ho's harbor is a Nuxt Content based personal developer site for notes, projects, wiki pages, and profile content.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

## Static Generate

```bash
npm run generate
```

## Content

Write Markdown files in `content/`.

- `content/blog/` for blog posts
- `content/wiki/` for long-term notes
- `content/projects/` for project pages
- `content/about.md` and `content/resume.md` for profile pages

Each file should include frontmatter:

```md
---
title: Example
description: Short summary
date: 2026-07-25
category: Linux
tags: [Linux, Tooling]
type: wiki
draft: false
---
```
