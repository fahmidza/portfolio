---
title: Customer Segmentation & Transaction Pattern Recognition using K-Means Clustering
date: 2025-03-27
description: Developed an unsupervised machine learning model using Python to segment bank customer transactions.
tags:
  - Python
  - Machine Learning
  - Data Analysis
  - Data Visualization
report_files:
  - label: Jupyter Notebook
    file: /files/Clustering (1).html
---

# Short Summary

Developed an unsupervised machine learning model using Python to segment bank customer transactions. This project processed a raw financial dataset containing 16 features, reduced data dimensionality using Principal Component Analysis (PCA), and objectively identified customer behavior patterns. The resulting clusters provide a data-driven foundation for targeted marketing and personalized financial services.

# The Challenge

Financial institutions hold massive amounts of transactional data but often lack clear, historical labels defining their dominant customer profiles. Relying on manual assumptions for customer classification is highly inefficient and prone to bias. The primary challenge was to discover hidden patterns across multiple variables (such as transaction amount, customer age, account balance, and channel) and group them into business-meaningful segments to target financial products accurately.
![](/img/pasted-image-1782823522940.png)

# Methodology & Execution

## 1. Data Preparation

- Conducted Exploratory Data Analysis (EDA), such as visualization distribution data and correlation data, to understand the distribution of financial variables and confirmed the absence of duplicate or missing value![](/img/pasted-image-1782823583002.png)

![](/img/pasted-image-1782823613962.png)

- Applied One-Hot Encoding to categorical variables like.
- Standardized numeric features using StandardScaler to handle outliers and ensure distance-based computations were unbiased.
- Implemented Principal Component Analysis (PCA) to reduce the dataset's dimensionality down to 2 principal components, optimizing computational efficiency while retaining the most crucial data variance.
  **2. Modeling**
- Implemented the K-Means Clustering algorithm utilizing the Scikit-Learn library on the PCA-transformed dataset.
- Executed an iterative modeling approach, systematically testing multiple scenarios for the number of clusters (k) to map data points into the most representative groups. Elbow and Silhoutte Score Methods is used to choose the optimal number of clusters.
  **3. Evaluation**

![](/img/pasted-image-1782882598271.png)

![](/img/pasted-image-1782882609356.png)

- Validated the quality of the segmentation mathematically by combining the Elbow Method (to measure distortion score) and the Silhouette Score.

![](/img/pasted-image-1782882912878.png)

- The post-PCA evaluation revealed that k=6 was the absolute optimal number of clusters.
- Achieved an outstanding final Silhouette Score of **0.917**, confirming highly cohesive internal groupings and strictly defined boundaries between the 6 clusters.

![](/img/pasted-image-1782823781026.png)

**4. Delivery**

- Applied an inverse transform to the scaled mathematical metrics, reverting the data back to its original values to ensure the clusters were completely interpretable by business executives.
- Developed comparative visualizations (Boxplots and Countplots) to profile the distinct characteristics of each cluster.

![](/img/pasted-image-1782883066335.png)

- Exported the finalized customer segmentation profiles into a structured CSV format ready for stakeholder integration and dashboarding.

### The Impact

Successfully isolated the transaction records into 6 highly specific, actionable customer personas. By mathematically differentiating segments, such as "The Digital Adopter" (Online Debit Users) from "The Premium Traditional" (Branch Credit Users with high balances), this analytical output eliminates intuition-based guesswork. It equips the business with a rigorous, quantitative framework to design precise customer retention strategies, accelerate digital channel adoption, and optimize premium product cross-selling.
