---
sidebar_position: 2
title: "Nitrogen Deficiency Detection"
description: "Deep learning model using EfficientNet_B4 to detect nitrogen deficiency in rice crops with 95.5% F1-score, deployed on Streamlit."
tags: [pytorch, deep-learning, computer-vision, streamlit, agriculture]
---

# Nitrogen Deficiency Detection in Rice Crops

> EfficientNet_B4-based image classifier detecting nitrogen deficiency levels in rice crops, achieving 95.5% F1-score and deployed as a Streamlit web app.

**🌾 Live App:** [rice-crop-plant-nitrogen-deficiency-detection.streamlit.app](https://rice-crop-plant-nitrogen-deficiency-detection.streamlit.app/)

## Overview

This project builds a **multi-class image classifier** that accurately detects nitrogen deficiency in rice crops from leaf images. Using transfer learning with EfficientNet_B4, the model helps farmers identify and treat nitrogen deficiency in a timely and efficient manner — eliminating the subjectivity of manual Leaf Color Chart (LCC) assessments.

## Problem Statement

Nitrogen deficiency is one of the most common nutritional disorders in rice cultivation, directly impacting crop yield. The traditional **Leaf Color Chart (LCC) method** — developed by the International Rice Research Institute (IRRI) — relies on human visual judgment, which introduces variability and requires training. This project uses **computer vision to bridge this gap**, providing consistent and objective assessments accessible to any farmer with a smartphone.

## Tech Stack & Tools

| Tool | Purpose |
|------|---------|
| PyTorch | Deep learning framework |
| EfficientNet_B4 | Pre-trained CNN architecture |
| Streamlit | Web application deployment |
| Python | Core programming language |
| Pillow (PIL) | Image processing |
| Scikit-learn | Evaluation metrics |

## Dataset Description

- **Source:** Sambalpur University nitrogen deficiency image dataset
- **Size:** 4,000+ images of rice crop leaves
- **Labels:** 4 classes based on LCC values (different nitrogen deficiency levels)
- **Organization:** Four subfolders representing deficiency severity levels
- **Reference:** [LCC Method - IRRI](https://pdf.usaid.gov/pdf_docs/PA00K938.pdf)

## Methodology & Approach

### 1. Data Preprocessing
- Resized all images to **100×100 pixels** for uniformity
- Normalized pixel values for model input
- Split into **80% training / 20% holdout**

### 2. Model Architecture
- **Base model:** EfficientNet_B4 (pre-trained on ImageNet)
- **Strategy:** Transfer learning with fine-tuning
- Modified final classification layer for 4-class output

### 3. Training Configuration
| Parameter | Value |
|-----------|-------|
| Epochs | 20 |
| Batch Size | 16 |
| Optimizer | Adam |
| Learning Rate | 0.001 |
| Split | 80/20 |

### 4. Deployment
- Built predictor function for batch evaluation
- Created Streamlit web app for single-image prediction
- Deployed to Streamlit Cloud for public access

## Key Results & Insights

### Model Performance

| Metric | Training | Holdout |
|--------|----------|---------|
| **F1-Score** | 97.3% | **95.5%** |

### Key Findings
- **95.5% F1-score** on holdout set demonstrates strong generalization
- Model successfully classifies all 4 nitrogen deficiency levels
- Eliminates human judgment variability in LCC assessments
- Deployed app enables real-time predictions from any device

### Impact
- Farmers can upload a photo and receive instant nitrogen deficiency diagnosis
- Reduces dependency on trained agricultural extension workers
- Enables data-driven fertilizer application decisions

## How to Reproduce

```bash
# Clone the repository
git clone https://github.com/fahmidza/nitrogen-deficiency-detection.git
cd nitrogen-deficiency-detection

# Install dependencies
pip install -r requirements.txt

# Run the Streamlit app locally
streamlit run streamlit-app.py
```

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| Limited dataset diversity | Applied data augmentation and transfer learning |
| Class imbalance across deficiency levels | Stratified splitting and class-weighted loss |
| Real-world deployment | Streamlit Cloud for easy, free hosting |

## Future Improvements

- Add **object detection** to identify plants in entire field images
- Expand dataset with more diverse rice varieties and environments
- Implement model compression for edge/mobile deployment
- Add multi-nutrient deficiency detection (potassium, phosphorus)
- Create mobile app for offline field use

## Links

- 🔗 [GitHub Repository](https://github.com/fahmidza/nitrogen-deficiency-detection)
- 🌐 [Live Streamlit App](https://rice-crop-plant-nitrogen-deficiency-detection.streamlit.app/)
- 📄 [About the LCC Method (IRRI)](https://pdf.usaid.gov/pdf_docs/PA00K938.pdf)
