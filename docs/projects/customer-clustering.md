---
category: dashboardss
sidebar_position: 1
title: Customer Transaction Clustering
description: Comparative clustering analysis on customer transaction data using 7 different methods including K-Means, GMM, and Deep Clustering.
tags:
  - python
  - clustering
  - unsupervised-learning
  - scikit-learn
  - keras
---

# Customer Transaction Clustering Analysis

> Segmenting customers using 7 clustering methods to uncover transaction patterns and deliver strategic business recommendations.

## Overview

This project performs a comprehensive clustering analysis on customer transaction data, comparing **seven different clustering algorithms** to identify the most effective segmentation approach. The analysis reveals three distinct customer segments based on transaction behavior, geographic location, and city demographics.

## Problem Statement

Businesses often struggle to understand the diverse behavioral patterns within their customer base. Without proper segmentation, marketing strategies remain generic and resource allocation becomes inefficient. This project addresses the need for **data-driven customer segmentation** to enable targeted business strategies.

## Tech Stack & Tools

| Tool | Purpose |
| --- | --- |
| Python | Primary programming language |
| Pandas & NumPy | Data manipulation and preprocessing |
| Scikit-learn | K-Means, Agglomerative, GMM clustering |
| Keras | Deep Clustering (Autoencoder + K-Means) |
| Scipy | K-Medians, Fuzzy C-Means |
| Matplotlib & Seaborn | Visualization and EDA |
| Jupyter Notebook | Development environment |

## Dataset Description

The dataset contains customer transaction records with features including:

- **Transaction amounts** — Purchase values and frequencies
- **Geographic coordinates** — Customer latitude/longitude
- **City population** — Demographic context of customer locations
- **Merchant location** — Point-of-sale geographic data

Source: `data_clustering.xlsx`

![](/img/pasted-image-1782565851822.png)

## Methodology & Approach

### 1. Exploratory Data Analysis

- Statistical descriptives and distribution analysis
- Missing value detection and handling
- Correlation heatmaps and feature relationships

### 2. Data Preprocessing

- **Outlier handling** using RobustScaler for robustness against extreme values
- Feature scaling and transformation for clustering readiness

### 3. Clustering Methods Applied

| # | Method | Approach |
| --- | --- | --- |
| 1 | **K-Means** | Centroid-based partitioning |
| 2 | **K-Medians** | Robust median-based clustering |
| 3 | **K-Medoids** | Exemplar-based, outlier-resistant |
| 4 | **Agglomerative** | Hierarchical bottom-up merging |
| 5 | **Fuzzy C-Means** | Soft/partial membership assignment |
| 6 | **Robust Weighted K-Means** | Weighted for outlier data |
| 7 | **Gaussian Mixture Model** | Probabilistic distribution-based |
| 8 | **Deep Clustering** | Autoencoder + K-Means hybrid |

### 4. Evaluation

All models evaluated using **Silhouette Score** to measure cluster cohesion and separation.

## Key Results & Insights

### Best Model: K-Medians Clustering

**Silhouette Score: 0.742** — the highest among all methods tested.

### Customer Segments Identified

| Cluster | Profile | Characteristics |
| --- | --- | --- |
| **Cluster 1** | Budget Shoppers | Low transaction values, small cities |
| **Cluster 2** | Regular Consumers | Medium transactions, large cities |
| **Cluster 3** | Premium Customers | High transaction values, metropolitan areas |

### Strategic Recommendations

- **Cluster 1:** Focus on increasing transaction value through targeted promotions
- **Cluster 2:** Strengthen loyalty through incentive programs and engagement
- **Cluster 3:** Retain premium customers with exclusive services and VIP treatment

## How to Reproduce

```bash
# Clone the repository
git clone https://github.com/fahmidza/Analisis-Clustering-untuk-Data-Transaksi-Pelanggan.git

# Install dependencies
pip install pandas numpy scikit-learn keras scipy matplotlib seaborn

# Run the notebook
jupyter notebook "Sintaks Clustering.ipynb"
```

## Challenges & Solutions

| Challenge | Solution |
| --- | --- |
| High-dimensional outliers | Applied RobustScaler instead of StandardScaler |
| Choosing optimal k | Used Elbow Method + Silhouette Analysis |
| Comparing 7+ methods fairly | Standardized evaluation with Silhouette Score |

## Future Improvements

- Incorporate temporal transaction patterns for dynamic segmentation
- Apply DBSCAN for density-based outlier-aware clustering
- Build a real-time customer scoring dashboard
- Add RFM (Recency, Frequency, Monetary) analysis layer

## Links

- 🔗 [GitHub Repository](https://github.com/fahmidza/Analisis-Clustering-untuk-Data-Transaksi-Pelanggan)
