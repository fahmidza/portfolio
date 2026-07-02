---
title: Public Sentiment Analysis of Electric Vehicle Policy
date: 2025-04-13
description: 'This project analyzes public sentiment in Indonesia toward electric vehicle policy using text data from social media platform X (Twitter), then classifies it into three categories: positive, negative, and neutral through a machine learning approach. After comparing eleven different classification algorithms, the K-Nearest Neighbors (KNN) model was selected as the best-performing model for predicting sentiment on new data.'
tags:
  - Sentiment Analysis
report_files:
  - label: Notebook
    file: /files/Analisis Sentimen Kendaraan Listrik.html
category: data-science
sidebar_position: 3
---

## Background

![](/img/20260702-190437.png)

Electric vehicle policy in Indonesia has received mixed public reactions, ranging from support for the SPKLU ecosystem to criticism regarding subsidies and their impact on the conventional automotive industry. This project aims to explore text data to understand the overall public sentiment, clean the data to improve analysis accuracy, and evaluate various classification models to conclude how the public perceives the policy.

## Dataset

The raw data consists of 500 tweets from X containing the columns username, tweet_url, Label, and full_text, with the initial labels represented on a numeric scale of -1 (negative), 0 (neutral), and 1 (positive). After removing duplicates and irrelevant data, the cleaned dataset was reduced to 391 rows (with a label distribution of 197 neutral, 134 negative, and 60 positive entries), indicating a dominance of neutral sentiment, but with a fairly significant negative proportion compared to positive sentiment.

![](/img/pasted-image-1782992251368.png)

## Text Preprocessing

The text cleaning process included removing usernames, links, and punctuation, followed by case folding to lowercase and handling slang words using a custom Indonesian slang dictionary. The next stage involved stopword removal and stemming using the Sastrawi library to reduce inflected words to their root forms, allowing variations such as "mendukung" and "dukung" to be treated equally by the model.

![](/img/20260702-183749.png "Cleaning Unnecessary Elements")

![](/img/20260702-183818.png "Text Cleaning")

![](/img/20260702-183923.png "Slang, Stopwords, and Stemming Processing")

## Modeling Methodology

The data was split into training, validation, and test sets using stratified sampling to preserve the label proportions in each subset, resulting in 315 training samples, 40 validation samples, and 36 test samples. Eleven classification models were compared using a TF-IDF Vectorizer pipeline and 5-fold cross-validation, including Random Forest, Logistic Regression, Decision Tree, SVM, Naive Bayes, MultinomialNB, SVC, SGDClassifier, KNN, GradientBoosting, and MLP.

## Model Comparison Results

The following table shows the initial performance of all models based on training and validation accuracy before tuning.

| Model | Train Accuracy | Val Accuracy |
| KNN | 54.29% | 61.11% |
| Logistic Regression | 55.56% | 58.33% |
| SVM | 53.97% | 55.56% |
| SVC | 53.97% | 55.56% |
| Random Forest | 55.56% | 52.78% |
| Naive Bayes | 53.02% | 52.78% |
| GradientBoosting | 56.51% | 50.00% |
| Decision Tree | 45.71% | 47.22% |
| SGDClassifier | 51.11% | 44.44% |
| MLP | 52.06% | 38.89% |

The four models with the highest validation accuracy (KNN, Logistic Regression, SVM, and SVC) were then tuned using GridSearchCV.

## Best Model Tuning Results

After tuning, KNN remained the best-performing model with parameters n_neighbors=7, weights='uniform', and algorithm='auto', achieving a validation accuracy of 61.11%. Logistic Regression and SVM/SVC followed with validation accuracies of 55.56% and 52.78%, respectively, after tuning.

| Model | Best Parameters | Val Accuracy |
| KNN | n_neighbors=7, weights=uniform, algorithm=auto | 61.11% |
| Logistic Regression | C=1.0, penalty=l2 | 55.56% |
| SVM | C=10, gamma=1, kernel=rbf | 52.78% |
| SVC | C=10, gamma=1, kernel=rbf | 52.78% |

## Tech Stack

Python · Scikit-learn · Sastrawi (Stemming & Stopword) · NLTK · WordCloud · Pandas & NumPy · Seaborn/Matplotlib · LIME (Model Interpretability)

## Business Value

### Real-Time Public Sentiment Monitoring

This sentiment classification model can be adapted into a continuous monitoring system to track shifts in public opinion regarding EV policy over time.

### Input for Policymakers

The finding that negative sentiment is higher than positive sentiment provides an important signal for policymakers that public communication around EV subsidies and infrastructure still needs improvement.

### Transparent Model Interpretation

The use of LIME (Local Interpretable Model-agnostic Explanations) in this project allows the key words driving sentiment predictions to be explained, increasing trust in the model’s output for non-technical stakeholders.

# Personal Learning

This project provided important insights into the challenges of classifying informal Indonesian text, including the importance of a domain-specific slang dictionary and how the small dataset size (391 samples) limits model accuracy even after extensive tuning,  a reminder that data quality and quantity are just as important as algorithm selection.
