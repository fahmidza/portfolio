---
sidebar_position: 3
title: "Electric Vehicle Sentiment Analysis"
description: "Sentiment analysis of public opinion on electric vehicles using NLP techniques."
tags: [python, nlp, sentiment-analysis, text-mining]
---

# Electric Vehicle Sentiment Analysis

> Mining public opinion on electric vehicles through text analysis and sentiment classification.

## Overview

This project analyzes **public sentiment toward electric vehicles (EVs)** using natural language processing techniques. By collecting and processing text data, the analysis reveals how people perceive the EV transition — identifying positive drivers, concerns, and neutral observations in public discourse.

## Problem Statement

As Indonesia accelerates its electric vehicle adoption strategy, understanding **public perception** is crucial for policymakers, manufacturers, and stakeholders. This project quantifies sentiment distribution to provide evidence-based insights into EV acceptance and resistance factors.

## Tech Stack & Tools

| Tool | Purpose |
|------|---------|
| Python | Core programming language |
| Pandas | Data processing and manipulation |
| TextBlob / VADER | Sentiment classification |
| NLTK / Sastrawi | Text preprocessing (Indonesian NLP) |
| Matplotlib & Seaborn | Visualization |
| Jupyter Notebook | Development environment |

## Methodology & Approach

### 1. Data Collection
- Gathered text data related to electric vehicle discussions
- Filtered for relevance and quality

### 2. Text Preprocessing
- Noise removal (URLs, mentions, special characters)
- Indonesian text normalization (slang correction)
- Tokenization and stopword removal
- Stemming using Sastrawi for Indonesian language

### 3. Sentiment Classification
- Polarity scoring using TextBlob
- Classification into **Positive**, **Neutral**, and **Negative** categories
- Subjectivity analysis for opinion strength measurement

### 4. Analysis & Visualization
- Sentiment distribution charts
- Word frequency analysis and word clouds
- Temporal sentiment trends

## Key Results & Insights

- **Sentiment Distribution:** Mixed opinions with identifiable patterns
- Common **positive themes:** Innovation, environmental benefits, cost savings
- Common **negative themes:** Charging infrastructure concerns, price barriers, range anxiety
- Results provide actionable insights for EV stakeholders in Indonesia

## How to Reproduce

```bash
git clone https://github.com/fahmidza/Analisis-Sentimen-Kendaraan-Listrik.git
pip install pandas textblob nltk Sastrawi matplotlib seaborn
jupyter notebook
```

## Future Improvements

- Apply transformer-based models (IndoBERT) for Indonesian sentiment
- Expand data sources to include news articles and forums
- Build aspect-based sentiment analysis (infrastructure, pricing, performance)
- Create temporal dashboard tracking sentiment shifts

## Links

- 🔗 [GitHub Repository](https://github.com/fahmidza/Analisis-Sentimen-Kendaraan-Listrik)
