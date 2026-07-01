---
title: 'Sentiment Analysis SATU SEHAT: Web Scraping to ML Development'
date: 2025-04-14
description: Developing an end-to-end system to analyze sentiment in Google Play Store reviews of the SATU SEHAT Mobile app, including automated web scraping, Indonesian text preprocessing (slang normalization, stemming), sentiment labeling using VADER, and a comparison of three classification models (Random Forest, Dense Neural Network, RNN).
tags:
  - Data Scraping
  - Sentiment Analysis
  - Data Visualization
  - Python
report_files:
  - label: Scraping Data
    file: /files/Code Scraping.html
  - label: Modeling
    file: /files/End to End Modeling.html
---

# A. Executime Summary

This analysis evaluates user sentiment toward Indonesia's national health application, Satu Sehat (formerly PeduliLindungi), based on Google Play Store review data spanning October 2021 to April 2025. Using Python-based text classification, the key findings reveal that user sentiment is heavily dominated by technical operational issues such as login failures and lost certificate history. However, the current sentiment extraction methodology suffers from an extremely severe classification bias (96% of data labeled Neutral), which distorts the modeling process and obscures the real urgency of user complaints.

# B. Business Context

SatuSehat is the official public health application from Indonesia's Ministry of Health, integrating electronic medical records, vaccination history, and other health services into a single platform. Understanding user sentiment is critical for both the development team and the government to determine whether system and interface updates are easing access to public services or creating new bottlenecks, as well as to map functionality improvement priorities in a data-driven manner.

# C. Eksekusi Teknis 

## 1. Data Scraping

![](/img/pasted-image-1782888905120.png)

Scraping review data from the Google Play Store produced a raw dataset. The scraping period from October 2021 to April 2025 yielded a total of 200,000 reviews.

## 2. Preprocessing Data

- Data cleaning was performed. Duplicate reviews were removed, retaining only one instance of each. Reviews consisting solely of emojis were also removed for this case.
- Word standardization was carried out, such as translating slang terms (e.g., "abis" to "habis," "gaje" to "tidak jelas") using predefined word dictionaries. Some of these dictionaries were sourced from other GitHub repositories, resulting in a cleaner dataset for sentiment analysis.
- Additional cleaning included removing mentions, hashtags, numbers, punctuation, and repeated letters (e.g., "banget" from "bangettt"), producing a clean text column that serves as the basis for modeling features.

## 3. Pelabelan Data

- This analysis uses the VADER (Valence Aware Dictionary and Sentiment Reasoner) method, a lexicon-based artificial intelligence approach that automatically assigns positive, negative, or neutral labels to short texts and informal language, making it suitable for app store reviews.
- The labeling results show a highly imbalanced distribution: Neutral 117,432 reviews (96.3%), Positive 2,984 reviews (2.4%), and Negative 1,557 reviews (1.3%).

![](/img/pasted-image-1782888869089.png)

- Data visualization was conducted as part of the exploratory data analysis (EDA) stage in the form of the following word clouds.

![](/img/20260701-135544.png)

![](/img/20260701-135549.png)

![](/img/20260701-135555.png)

The word clouds from the data exploration stage highlight dominant words such as "login," "aplikasi" (app), "vaksin" (vaccine), "sertifikat" (certificate), "nik" (national ID number), and "otp," indicating that the majority of user complaints revolve around account authentication issues, OTP code verification, and lost vaccination history following the migration from PeduliLindungi. This finding is consistent with the raw review content, which shows recurring complaints such as "cannot log in," "my vaccine certificate is missing," and "verification code rejected even though it was correct."

## 4. Modeling

Several methods were used to model this sentiment data for testing sentiment on new comments.

| Model | Training Accuracy | Test Accuracy |
| --- | --- | --- |
| Random Forest + TF-IDF | 99.82% | 99.40% |
| Dense Neural Network + Tokenizer | 94.87% | 96.22% |
| Recurrent Neural Network (RNN) + Tokenizer | 97.69% (reached an early-stop point of 92% at the first epoch) | 98.36% |

Random Forest and RNN produced the highest and nearly comparable accuracy on both training and test data. RNN was selected as the final model for inference because it is more reliable at capturing sequential sentence context compared to the bag-of-words TF-IDF approach used by Random Forest.

## 5. Inference / Testing

The RNN model was tested on newly constructed sentences (not from the original dataset) to validate its generalization capability. All three test sentences, for example, "This app is fairly useful, but some functions feel unintuitive for new users," were entirely predicted as Neutral. This result reflects the model's bias toward the Neutral class due to the highly imbalanced training data distribution (96% labeled Neutral), causing the model to become "lazy" in predicting minority classes despite the seemingly very high overall accuracy.

# 6. Analysis Conclusion

Nominally, SATU SEHAT Mobile user sentiment is dominated by the Neutral label according to VADER. However, this reflects the limitations of lexicon-based labeling for informal Indonesian slang more than it reflects the actual reality of the user experience. In this case, the raw review content is in fact filled with sharp complaints about login issues, OTP, and lost vaccination data. The very high model accuracy (RF 99.4%, RNN 98.4%) is potentially misleading, as the model easily learns to predict the majority class (Neutral) rather than genuinely understanding the nuances of critical negative sentiment, which holds the most business value for follow-up action.

# Recommendations

- Conduct manual relabeling or use a more accurate Indonesian-language lexicon model (such as InSet or a fine-tuned IndoBERT), as VADER is designed for English and is less sensitive to Indonesian emotional expressions.
- Apply data balancing techniques (oversampling the Negative/Positive classes or class weighting) before retraining the model, so that it does not become biased toward the dominant Neutral class.
- Developers should prioritize technical fixes for login issues, OTP verification, and vaccine data synchronization, as these are the most frequently mentioned topics in negative reviews, serving as a direct follow-up action from the word cloud and content analysis findings.
