---
title: Automated ETL Pipeline for Fashion Product Data
date: 2025-05-25
description: 'This project builds an automated ETL (Extract, Transform, Load) pipeline that collects fashion product data from an e-commerce website, cleans it, and distributes it to three distinct storage destinations: CSV, Google Sheets, and PostgreSQL . The entire process is designed to be modular and equipped with unit tests to ensure the reliability of each stage.'
tags:
  - Data Scraping
  - Python
report_files: []
---

## Background

Product data from e-commerce websites is often scattered across unstructured and inconsistent HTML formats, such as prices listed in foreign currencies, ratings with varying text formats, or invalid product entries. This project was built to demonstrate how the raw data collection process can be fully automated into a clean, analysis-ready dataset, eliminating the need for repeated manual intervention.

## Pipeline Architecture

The pipeline follows a classic ETL pattern, broken down into three independent modules: `extract.py`, `transform.py`, and `load.py`, all of which are executed sequentially from `main.py` .

![ETL data pipeline infographic](/img/20260702-165441.png "ETL Data Pipeline")

## 1. Extract

This module performs web scraping using BeautifulSoup to retrieve product information from each product card on the webpage, including title, price, rating, number of color options, size, and target gender, then automatically navigates through subsequent pages via the pagination button until all data has been collected .

## 2. Transform

The raw scraped data is cleaned through a series of steps: removing empty rows, filtering out invalid entries (such as "Unknown Product" or "Price Unavailable"), removing duplicates, converting prices from USD to Indonesian Rupiah, extracting rating values and color counts into numeric form, and standardizing the format of the size and gender columns .

## 3. Load

The cleaned dataset is then distributed to three destinations simultaneously: saved as a local CSV file, uploaded to Google Sheets via the Google Sheets API using service account authentication, and loaded into a PostgreSQL table using SQLAlchemy.

## Data Quality After Transformation

Every column in the final dataset has a consistent, validated data type, ready for further analysis.

| Column | Data Type | Description |
| Title | object | Fashion product name |
| Price | float64 | Price in Indonesian Rupiah, converted from USD |
| Rating | float64 | Product rating score, extracted from text |
| Colors | int64 | Number of available color options |
| Size | object | Product size, cleaned from the "Size:" label |
| Gender | object | Target gender for the product, cleaned from the "Gender:" label |

## Business Value

## Operational Efficiency

This pipeline eliminates the need for manual data entry, enabling business teams or analysts to consistently receive up-to-date product data on a scheduled basis.

## Data Distribution Flexibility

With three output channels (CSV, Google Sheets, PostgreSQL), the same dataset can be readily consumed by non-technical teams through spreadsheets, as well as by advanced analytics systems through a relational database .

## Scalability

The pipeline's modular structure makes it easy to add new data sources or additional storage destinations in the future without overhauling the entire system.

### Links

- 🔗 [GitHub Repository](https://github.com/fahmidza/Automated-ETL-Pipeline-for-Fashion-Product-Data)
