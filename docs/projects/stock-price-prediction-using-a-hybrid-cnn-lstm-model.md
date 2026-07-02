---
title: Stock Price Prediction Using a Hybrid CNN-LSTM Model
date: 2026-05-29
description: This project builds a hybrid CNN-LSTM deep learning model to predict the closing stock price of PT Astra Agro Lestari Tbk. (AALI.JK) using over 24 years of daily historical data . The model is further optimized through automated hyperparameter tuning using KerasTuner to compare the baseline model's performance against the optimized model.
tags:
  - Forecasting
  - Python
  - Deep Learning
report_files:
  - label: Notebook Source Code
    file: /files/AALI Stock Forecasting.html
  - label: Report
    file: /files/AALI Stock Forecasting Report.html
---

## Background

Stock prices are highly volatile and influenced by numerous factors, ranging from macroeconomic conditions to market sentiment and corporate actions such as dividend distributions. AALI.JK, as one of Indonesia's largest palm oil plantation companies, has price movements influenced by both global commodity prices and the company's own fundamental performance. The ability to predict stock price trends is valuable for investors making buy, hold, or sell decisions, as well as for investment managers in portfolio risk management strategies.

![image.png](/img/20260702-171802.png)

## Dataset

Historical price data for AALI.JK was obtained from Yahoo Finance, covering the period from April 5, 2001 to May 23, 2025, with a total of 6,002 rows of daily data. Of the eight raw data columns (Open, High, Low, Close, Volume, Adjusted, etc.), only the date and closing price (Close) columns were used as the prediction focus in this project.

![](/img/20260702-171129.png)

The historical data chart shows a significant upward trend up to roughly the midpoint of the period, peaking above 30,000, before undergoing sharp fluctuations and a consistent downward trend that stabilized around the 5,000 range in the most recent period.

## Data Preparation

- Data was split chronologically into 70% training data and 30% test data to preserve the temporal dependency between time steps.
- Stock prices were normalized to a 0–1 range using MinMaxScaler to allow the neural network model to converge more stably and quickly.
- Data was transformed into time series sequences with a 30-day `look_back` window using `TimeseriesGenerator`, allowing the model to learn from the previous 30 days to predict the next day's price.

## Model Architecture

The hybrid model combines two types of layers: Conv1D to extract short-term local patterns from sequential data, and LSTM to capture long-term temporal dependencies from the features extracted by the CNN.

## Baseline Model

The initial architecture uses Conv1D with 32 filters, LSTM with 25 units, along with L2 regularization and layered Dropout (0.5 after the CNN, 0.2 after the LSTM) to prevent overfitting.

![](/img/20260702-171027.png)

![](/img/20260702-171118.png)

## Hyperparameter-Tuned Model

Using KerasTuner with a RandomSearch strategy across 20 trials, the search was conducted over eight parameters simultaneously, including the number of Conv1D filters, LSTM units, dropout rate, and learning rate. The best combination found was 24 Conv1D filters, 25 LSTM units, dropout of 0.5 (CNN) and 0.1 (LSTM), and a learning rate of 0.0005.

![](/img/20260702-171054.png)

![](/img/20260702-171107.png)

## Results and Model Comparison

Both models were evaluated using RMSE and MAE on the original price scale (Rupiah) after the inverse scaling process.

| Model | Val Loss (Normalized MSE) | Test RMSE (Original Scale) | Test MAE (Original Scale) |
| Baseline CNN-LSTM Model | 0.00330 | 1003.72 | 768.05 |
| Hyperparameter-Tuned Model | 0.00117 | 1081.89 | 933.12 |

Interestingly, although the tuned model recorded a much lower validation loss during training, the baseline model actually showed better RMSE and MAE when tested on the original price scale. This insight confirms that optimal performance on normalized data does not always translate into better generalization on real-world values.

## Qualitative Analysis

Both the baseline and tuned models successfully followed the general direction of the stock price trend, but both showed prediction patterns that were far smoother than the actual price volatility and experienced a lag effect during rapid price changes. During periods of sharp price surges, both models consistently underestimated the magnitude of the actual price peaks and troughs.
