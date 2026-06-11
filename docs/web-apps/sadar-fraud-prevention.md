---
sidebar_position: 1
title: "SADAR — Fraud Prevention"
description: "Full-stack digital fraud prevention application with suspicious URL detection, built as a DBS Foundation capstone project."
tags: [python, machine-learning, web-app, nlp, cybersecurity]
---

# SADAR — Digital Fraud Prevention Application

> A full-stack application for preventing digital fraud, featuring ML-powered suspicious URL detection built as a national capstone project.

**🏷️ Capstone Project:** *Coding Camp powered by DBS Foundation — Machine Learning Engineer Cohort*

## Overview

**SADAR** (an acronym conveying awareness and alertness) is a **digital fraud prevention application** developed as a capstone project during the Coding Camp powered by DBS Foundation. The project combines machine learning for suspicious URL detection with a user-friendly web interface, helping users identify and avoid potential digital fraud attempts.

## Problem Statement

Digital fraud — including phishing, scam websites, and malicious URLs — is a growing threat in Indonesia's increasingly digital economy. Users often lack the technical knowledge to identify fraudulent links. SADAR provides an **accessible, ML-powered tool** that empowers users to verify URLs before clicking, reducing their exposure to digital fraud.

## Tech Stack & Tools

| Tool | Purpose |
|------|---------|
| Python | ML model development |
| Jupyter Notebook | Model training and experimentation |
| Machine Learning | URL classification models |
| NLP Techniques | URL feature extraction |
| Web Framework | Application deployment |

## Team & Collaboration

This project was built by a **6-member cross-functional team**:
- **Machine Learning Engineers** — Model development, feature engineering, training
- **Front-End Developers** — User interface design and implementation
- **Back-End Developers** — API development, server infrastructure

## Methodology & Approach

### 1. Data Collection
- Compiled datasets of legitimate and malicious URLs
- Feature extraction from URL structure (length, special characters, domain patterns)
- Label verification and data balancing

### 2. Feature Engineering
- URL lexical features (length, number of dots, special characters)
- Domain-based features (age, registration, WHOIS data)
- Content-based features (suspicious keywords, patterns)
- TLD and path analysis

### 3. Model Development
- Trained classification models to distinguish legitimate vs. suspicious URLs
- Hyperparameter optimization for production performance
- Model evaluation with precision, recall, and F1-score

### 4. Application Integration
- ML model wrapped in API endpoint
- Frontend interface for URL submission and result display
- Real-time prediction pipeline

## Key Results & Insights

- Successfully built an end-to-end fraud detection pipeline
- Model effectively classifies URLs as legitimate or suspicious
- Application provides user-friendly interface for non-technical users
- Project demonstrated effective cross-functional collaboration

### Impact
- Empowers users to make **informed decisions before clicking links**
- Reduces vulnerability to phishing and scam attacks
- Scalable architecture allows future feature expansion

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Cross-functional team coordination | Regular standups and clear API contracts |
| Feature engineering for URLs | Comprehensive lexical and domain analysis |
| Balancing model accuracy and speed | Optimized lightweight model for real-time inference |

## Future Improvements

- Add browser extension for real-time URL scanning
- Implement email phishing detection
- Expand to SMS/WhatsApp message scanning
- Build community-driven threat reporting system
- Add multi-language support for Indonesian users

## Links

- 🔗 [GitHub Repository](https://github.com/fahmidza/SADAR)
