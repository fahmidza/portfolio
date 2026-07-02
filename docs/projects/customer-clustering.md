---
title: Customer Transaction Segmentation Using Multi-Algorithm Clustering
date: 2024-11-13
description: This project builds a clustering model to group customer transaction patterns into three distinct segments, comparing the performance of 11 clustering algorithms simultaneously to identify the most optimal approach . The resulting segmentation is designed to help the company, in this case study "Loans R Us," gain a deeper understanding of customer characteristics to support customer growth strategies .
tags:
  - Python
sidebar_position: 1
category: dashboardss
---

## Background

In a business context, clustering techniques are widely used for customer segmentation, grouping customers based on their transaction characteristics, while in a security context, clustering can also help detect unusual transaction patterns. A good cluster is characterized by high homogeneity among members within a group and high heterogeneity between different groups. This project specifically aims to identify the characteristics of each customer segment so the company can formulate more targeted strategic recommendations.

![](/img/20260702-172916.png)

## Dataset

![](/img/20260702-172947.png)

The dataset used contains 14,446 customer transactions with six main variables: transaction amount (amt), the buyer's geographic location (lat, long), the population of the cardholder's city (city_pop), and the merchant's geographic location (merch_lat, merch_long). An initial check confirmed there were no missing values across all variables used.

Exploratory analysis via a scatter plot matrix showed no strong linear relationships between variables, except between the buyer's and merchant's location coordinates (lat–merch_lat, long–merch_long), which is reasonable given their geographic proximity to each other.

![](/img/20260702-173023.png)

![](/img/20260702-173046.png)

## Data Preparation

Since the amt and city_pop variables have a much larger value range compared to the other geographic variables, scaling was applied selectively using RobustScaler, a scaling method based on the median and interquartile range (IQR) that is more resistant to outliers than standard methods . The geographic variables (lat, long, merch_lat, merch_long) were deliberately left unscaled because they carry important intrinsic meaning that needed to be preserved in the analysis.

## Clustering Methodology

This project uniquely tests and compares 11 different clustering algorithms to identify the approach with the best clustering quality, evaluated using the Silhouette Coefficient, which measures how well data points fit within their own cluster compared to their distance from other clusters.

The algorithms tested include partitional approaches (K-Means, K-Medoids, K-Medians, Fuzzy C-Means, Robust Weighted K-Means), hierarchical approaches (Agglomerative Clustering), probabilistic approaches (Gaussian Mixture Model), as well as more advanced approaches such as Spectral Co-Clustering, Isolation Forest, and Autoencoder-based Deep Clustering.

## Algorithm Comparison Results

After thorough testing, the following is the performance ranking of all algorithms based on Silhouette Score.

| Rank | Method | Silhouette Score |
| 1 | KMeans++ | 0.4896 |
| 2 | KMeans | 0.4895 |
| 3 | Robust Weighted K-Means | 0.4862 |
| 4 | Co-Clustering | 0.4860 |
| 5 | Agglomerative Clustering | 0.4775 |
| 6 | Deep Clustering (Autoencoder) | 0.4706 |
| 7 | K-Medians | 0.4686 |
| 8 | Isolation Forest | 0.3884 |
| 9 | K-Medoids | 0.3847 |
| 10 | Fuzzy C-Means | 0.3797 |
| 11 | Gaussian Mixture Model | 0.1313 |

KMeans++ was selected as the best-performing algorithm with a Silhouette Score of 0.4896, only marginally higher than standard KMeans, indicating that smarter centroid initialization provides a slight improvement in cluster quality compared to random initialization.

## Customer Segment Characteristics

![](/img/20260702-173110.png)

Based on the best-performing model, the data was divided into three clusters with an unbalanced member distribution: Cluster 0 with 6,870 transactions, Cluster 1 with 6,581 transactions, and Cluster 2 with only 995 transactions . This imbalance in cluster size suggests the existence of one significantly smaller customer segment that potentially has unique characteristics compared to the two larger majority segments.

## Tech Stack

`Python` · `Scikit-learn` · `PyClustering` · `Fuzzy-c-means` · `TensorFlow/Keras (Autoencoder)` · `Pandas` · `Seaborn` · `Contextily`

## Business Value

### Segmented Customer Acquisition Strategy

By understanding three distinct customer segments, the company can design more personalized marketing strategies and product offerings instead of a one-size-fits-all approach for all customers.

### Transaction Anomaly Detection

The clustering approach in this project also opens up the potential to identify unusual transaction patterns that warrant closer attention in the context of risk management .

### A Comprehensively Validated Methodology

The systematic comparison of 11 algorithms provides greater confidence that the selected segmentation result is genuinely the best approach, rather than simply a default choice.

## Personal Learning

This project reinforced understanding of the importance of targeted preprocessing, such as applying RobustScaler selectively only to variables that genuinely require it, as well as the value of multi-algorithm benchmarking instead of assuming a single best method applies to every clustering case.
