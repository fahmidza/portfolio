---
slug: lessons-from-ml-projects
title: "5 Lessons from Building Machine Learning Models in the Real World"
authors: [fahmidza]
tags: [machine-learning, best-practices, technical]
---

# 5 Lessons from Building Machine Learning Models

After building models for earthquake prediction, crop disease detection, fraud prevention, and customer segmentation, I've collected hard-earned lessons that textbooks don't always teach. Here are five that changed how I approach ML projects.

<!-- truncate -->

## 1. The Best Model is the One You Can Explain

When I built the [Earthquake Damage Prediction](/docs/machine-learning/earthquake-damage-prediction) model using CatBoost, the raw accuracy was impressive. But what made the project truly valuable was integrating **SHAP (SHapley Additive exPlanations)** for interpretability.

Stakeholders don't just want to know *what* the model predicts — they want to know *why*. SHAP force plots turned our black-box model into a transparent decision-support tool. The lesson: **always budget time for interpretability**.

## 2. Feature Engineering > Model Selection

In the [Customer Transaction Clustering](/docs/data-science/customer-clustering) project, I compared 7 different clustering algorithms. The difference between the best and worst model was significant — but the biggest performance jump came from **how I preprocessed the data**, not which algorithm I chose.

Using RobustScaler instead of StandardScaler made every algorithm perform better. A well-engineered feature set with a simple model will almost always outperform a complex model with raw features.

## 3. Your Test Set is Sacred

Early in my journey, I made the classic mistake of peeking at test data during development. The [Nitrogen Deficiency Detection](/docs/machine-learning/nitrogen-deficiency-detection) project taught me discipline: strict 80/20 split, no data leakage, and honest reporting.

The result? A model that achieved **95.5% F1-score on holdout data** — a number I can stand behind with confidence because the evaluation was truly unbiased.

## 4. Deployment is a Feature, Not an Afterthought

Building a model in a Jupyter notebook is only half the job. The nitrogen deficiency project's real impact came from **deploying it as a Streamlit app**. Suddenly, a farmer could upload a photo and get instant results — no Python installation required.

This experience pushed me to think about **end-user experience** from day one. Who will use this? How will they interact with it? These questions should shape your architecture choices early.

## 5. Start with the Problem, Not the Solution

It's tempting to jump straight to the latest deep learning architecture. But in the [Twitter Disability Sentiment Analysis](/docs/data-science/twitter-disability-sentiment) project, simple TextBlob sentiment classification was the right tool for the job.

The project's value wasn't in algorithmic sophistication — it was in the **insight that 50% of disability discourse on Indonesian Twitter is informational/neutral**, revealing an opportunity for advocacy campaigns. The problem should dictate the solution, not the other way around.

---

## The Meta-Lesson

Every project teaches you something new. The key is to **document what you learn** (hence this blog) and apply it to the next challenge. My portfolio isn't just a showcase of results — it's a record of my growth as a data practitioner.

*Explore all my projects in the [portfolio](/docs/intro) to see these lessons in action.*
