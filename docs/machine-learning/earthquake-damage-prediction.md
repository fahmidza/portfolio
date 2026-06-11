---
sidebar_position: 1
title: "Earthquake Damage Prediction"
description: "Predicting building damage levels from earthquakes using CatBoost gradient boosting with SHAP interpretability analysis."
tags: [python, catboost, shap, machine-learning, disaster-preparedness]
---

# Earthquake Building Damage Prediction

> Predicting building damage severity from earthquakes using CatBoost with SHAP-powered interpretability for disaster preparedness.

## Overview

This project builds a **multi-class classification model** to predict the degree of damage to buildings following earthquakes in Indonesia. Using CatBoost gradient boosting and SHAP (SHapley Additive exPlanations), the model not only predicts damage levels but also **explains which factors contribute most** to building vulnerability.

## Problem Statement

Indonesia sits on the Pacific Ring of Fire, making it highly prone to seismic activity. Predicting which buildings are **most vulnerable to earthquake damage** enables proactive disaster preparedness, resource allocation, and building code improvements. Traditional assessment methods are costly and time-consuming — machine learning offers a scalable alternative.

## Tech Stack & Tools

| Tool | Purpose |
|------|---------|
| Python | Core programming language |
| CatBoost | Gradient boosting classification |
| SHAP | Model interpretability and feature importance |
| Pandas & NumPy | Data processing |
| Scikit-learn | Preprocessing and evaluation |
| Matplotlib & Seaborn | Visualization |
| Jupyter Notebook | Development environment |

## Dataset Description

The dataset contains building characteristics and earthquake damage assessments:
- **Building features:** Age, height, floor count, construction materials
- **Geographic data:** Location coordinates, district information
- **Structural data:** Foundation type, roof type, wall material
- **Target variable:** Damage grade (multi-class classification)

## Methodology & Approach

### 1. Exploratory Data Analysis
- Damage distribution analysis across regions
- Feature correlation and importance exploration
- Missing value treatment and data quality checks

### 2. Feature Engineering
- Categorical encoding for building materials
- Geographic feature extraction
- Interaction features between structural components

### 3. Model Training
- **CatBoost Classifier** — handles categorical features natively
- Hyperparameter tuning via grid search / Bayesian optimization
- Cross-validation for robust performance estimation
- Class imbalance handling strategies

### 4. Interpretability with SHAP
- Global feature importance ranking
- Individual prediction explanations
- Dependence plots for key features
- Force plots for specific building assessments

## Key Results & Insights

### Model Performance
- CatBoost achieved strong multi-class classification accuracy
- SHAP analysis revealed the **most critical vulnerability factors**

### Top Contributing Features (via SHAP)
1. **Building age** — Older buildings significantly more vulnerable
2. **Construction material** — Certain materials correlate with higher damage
3. **Foundation type** — Strong foundations reduce damage probability
4. **Geographic location** — Proximity to fault lines matters

### Practical Impact
- Model can **prioritize building inspections** in earthquake-prone areas
- SHAP explanations make results **actionable for non-technical stakeholders**
- Results inform building code recommendations

## How to Reproduce

```bash
git clone https://github.com/fahmidza/Prediksi-Kerusakan-Bangunan-Akibat-Gempa-di-Indonesia-dengan-CatBoost-dan-Analisis-SHAP.git
pip install catboost shap pandas numpy scikit-learn matplotlib seaborn
jupyter notebook
```

## Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| High-cardinality categorical features | Leveraged CatBoost's native categorical handling |
| Multi-class imbalance | Applied class weights and stratified sampling |
| Model black-box concern | SHAP provides transparent, interpretable explanations |

## Future Improvements

- Integrate with GIS systems for spatial risk mapping
- Real-time prediction API for building assessment apps
- Ensemble with other models (XGBoost, LightGBM) for comparison
- Incorporate seismic intensity data as additional features

## Links

- 🔗 [GitHub Repository](https://github.com/fahmidza/Prediksi-Kerusakan-Bangunan-Akibat-Gempa-di-Indonesia-dengan-CatBoost-dan-Analisis-SHAP)
