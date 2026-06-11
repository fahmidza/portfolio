---
sidebar_position: 4
title: "Twitter Disability Sentiment Analysis"
description: "Crawling 4,500+ tweets and analyzing public sentiment on disability issues in Indonesia."
tags: [python, nlp, web-scraping, sentiment-analysis, social-impact]
---

# Twitter Data Crawling & Disability Sentiment Analysis

> Crawling 4,500+ tweets to understand Indonesian public opinion on disability, inclusion, and special education.

**🏷️ Competition Project:** *Ikhlas Aja | VSC GAMMAFEST 24*

## Overview

This project combines **web scraping and NLP** to analyze public sentiment regarding disability issues in Indonesia. By crawling Twitter data using targeted keywords and applying sentiment classification, the project reveals how Indonesian society perceives topics like disability inclusion and special education (*Sekolah Luar Biasa*).

## Problem Statement

Disability inclusion remains an important social issue in Indonesia. Understanding **public perception through social media** provides valuable insights for advocacy groups, policymakers, and educational institutions. This project quantifies the sentiment landscape around disability discourse on Twitter.

## Tech Stack & Tools

| Tool | Purpose |
|------|---------|
| Python | Core programming language |
| Node.js + tweet-harvest | Twitter data crawling |
| Pandas | Data processing |
| TextBlob | Sentiment classification |
| Sastrawi | Indonesian text stemming |
| Google Translate API | Indonesian → English translation |
| Matplotlib | Visualization |

## Dataset Description

- **Total tweets collected:** 4,500 (3 keywords × 1,500 tweets each)
- **Keywords used:**
  - `disabilitas lang:id` (disability)
  - `pendidikan disabilitas` (disability education)
  - `sekolah luar biasa` (special education school)
- **Output format:** CSV (`disabilitas_file.csv`)

## Methodology & Approach

### Phase 1: Data Crawling
1. Set up Node.js environment with `tweet-harvest` tool
2. Defined search queries with Indonesian language filter
3. Crawled 1,500 tweets per keyword (4,500 total)
4. Stored results in structured CSV format

### Phase 2: Text Preprocessing
- Removed mentions, hashtags, retweets, special characters
- Normalized Indonesian slang (e.g., "gak" → "tidak")
- Tokenization and stemming with Sastrawi
- Whitespace and duplicate cleaning

### Phase 3: Translation & Classification
- Translated Indonesian text to English via Google Translate API
- Calculated polarity and subjectivity scores using TextBlob
- Classified sentiment:
  - **Positive:** polarity > 0
  - **Neutral:** polarity = 0
  - **Negative:** polarity < 0

## Key Results & Insights

### Sentiment Distribution

| Sentiment | Percentage |
|-----------|-----------|
| 🟢 Positive | 35% |
| ⚪ Neutral | 50% |
| 🔴 Negative | 15% |

### Key Findings
- **Majority neutral (50%)** — Informational sharing dominates disability discourse
- **Positive sentiment (35%)** — Support for inclusive education initiatives
  - *Example: "Inclusive schools are the future of education for all children!"*
- **Negative sentiment (15%)** — Frustration with inadequate facilities
  - *Example: "Facilities for students with disabilities are still severely lacking."*

## How to Reproduce

```bash
git clone https://github.com/fahmidza/Crawling-Data-Twitter-dan-Analisis-Sentimen-Isu-Disabilitas-di-Indonesia.git

# Install Node.js dependencies for crawling
npm install -g tweet-harvest

# Install Python dependencies
pip install pandas textblob Sastrawi googletrans matplotlib

# Run notebooks in order
jupyter notebook "Sintaks Crawling Twitter Data.ipynb"
jupyter notebook "Sintaks Analisis Sentimen.ipynb"
```

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Indonesian language NLP limitations | Translated to English for TextBlob compatibility |
| Slang and informal language | Built custom normalization dictionary |
| Twitter rate limits | Batched crawling with delays |

## Future Improvements

- Use IndoBERT for native Indonesian sentiment analysis (no translation needed)
- Expand to other social media platforms (Instagram, TikTok comments)
- Apply topic modeling (LDA) to identify specific discussion themes
- Build a longitudinal study tracking sentiment shifts over time

## Links

- 🔗 [GitHub Repository](https://github.com/fahmidza/Crawling-Data-Twitter-dan-Analisis-Sentimen-Isu-Disabilitas-di-Indonesia)
