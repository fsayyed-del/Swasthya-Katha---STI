---
name: 2slides-ppt-generator
description: "AI-powered presentation generation via the 2slides API and local python-pptx — create slides from text, match a reference image style, summarize documents into decks, add AI voice narration, and export PowerPoint decks/PDFs. Use for any 'make slides', 'create a presentation', 'generate a PPT deck', or 'slides from this document' request."
category: api-integration
risk: safe
source: community
source_repo: 2slides/slides-generation-2slides-skills
source_type: community
date_added: "2026-06-05"
author: 2slides
tags: [presentations, slides, powerpoint, ai, api-integration, pdf, narration, document-summarization]
tools: [claude, cursor, gemini, codex, antigravity]
plugin:
  setup:
    type: manual
    summary: "Install Python requirements and configure a 2slides API key or use local python-pptx generation."
    docs: SKILL.md
---

# 2slides Presentation & PowerPoint Deck Generation

## Overview

Generate professional presentations and PowerPoint decks using either the **2slides AI API** or local **python-pptx**. The skill supports content-based generation (theme-driven Fast PPT), style matching from a reference image, custom PDF design, document summarization, AI voice narration, and exporting PPTX/PDF.

## When to Use This Skill

- Use when the user asks to "create a presentation", "make slides", "generate a PPT deck", or "turn this into a PowerPoint".
- Use when the user wants slides that match the style of a reference image ("create slides like this image").
- Use when the user uploads a document and asks to "create slides from this document".
- Use when the user wants to add AI voice narration to generated slides, or export slides as PNG images and narration as WAV audio.
- Use when the user asks "what themes are available?" or wants to browse/select a theme.
