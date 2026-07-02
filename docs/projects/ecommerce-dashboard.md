---
title: 'Analyzing E-Commerce Customer Behavior Through Data: From Notebooks to Interactive Dashboards'
date: 2025-03-09
description: Interactive business intelligence dashboard analyzing e-commerce performance metrics and revenue trends.
tags:
  - Dashboard
report_files:
  - label: Processing Notebook
    file: /files/E-Commerce Data Processing.html
sidebar_position: 1
category: dashboardss
---

# Reading E-Commerce Customer Behavior Through Data: From Notebook to Interactive Dashboard

This data analysis project was built to answer strategic questions surrounding sales, payment methods, customer satisfaction, and retention on an e-commerce platform, using a public dataset comprising over 119,000 rows of combined transactions from nine relational tables (orders, payments, reviews, products, customers, and sellers).

## 1. Project Background

This dataset consists of nine tables interconnected through key columns such as `order_id`, `product_id`, and `customer_id`, reflecting the structure of real-world e-commerce transaction data. After the merging process, a single master dataset was formed containing 119,143 rows and 39 columns, which serves as the basis for the entire analysis.

- The relationships between tables are _one-to-many_ and _many-to-one_, for example, one customer can have multiple orders, and one order can contain multiple products.
- Initial data quality was fairly good: no duplicate data was found in the merged dataset.
- Several columns had significant _missing values_, particularly in customer review titles and content (approximately 88% and 58% empty, respectively), which is reasonable since not all buyers write reviews.

## 2. Business Questions Addressed

This analysis was designed to answer nine core business questions relevant to the growth, operations, and customer experience teams:

1. How does variation in product price affect sales volume?
2. How do payment method preferences affect conversion rates and transaction volume?
3. Is there a relationship between price, shipping cost, and customer review scores?
4. How is shipping cost distributed between cheap and expensive products?
5. How does payment method affect customer satisfaction?
6. Which product categories have the highest number of orders?
7. At what hours is ordering activity highest and lowest?
8. What is the proportion of on-time versus late orders?
9. Who are the best customers based on RFM (Recency, Frequency, Monetary) analysis?

## 3. Data Wrangling Process

![](/img/pasted-image-1782976677392.png "Data Wrangling Process")

This stage covers three main steps: _gathering_, _assessing_, and _cleaning_ the data before moving into exploration.

- **Gathering:** Nine CSV files were automatically loaded and merged into a single main dataframe using `merge` based on the relational keys between tables .
- **Assessing:** Inconsistent data types were found (for example, dates still stored as text), along with a number of _missing values_ in the shipping and review columns .
- **Cleaning:** Date columns were converted to `datetime` format, while rows with _missing values_ were retained to avoid significantly reducing the data volume .

## 4. Key Insights from Data Exploration

Data exploration revealed several important patterns that form the basis of the business recommendations:

| Analysis Area | Key Insight |
| Price & Sales | Lower-priced products tend to have higher transaction volumes compared to higher-priced products |
| Payment Method | Credit card is the dominant method and correlates with the highest transaction volume |
| Customer Satisfaction | Customer satisfaction is driven by factors other than price and shipping costs. |
| Product Categories | Certain categories dominate the top 10 order counts compared to others |
| Ordering Time Patterns | Ordering activity shows rising and falling trends throughout the day, with specific peak hours |
| Delivery Timeliness | Most orders were delivered on or before the estimated delivery date. However, approximately 7.6% of orders experienced delivery delays, highlighting an opportunity for the company to improve its delivery efficiency. |

![](/img/pasted-image-1782976694496.png "Product Prices Distribution")

![](/img/pasted-image-1782976701021.png "Transaction Frequency by Payment Method")

![](/img/pasted-image-1782976708337.png "Heatmap Correlation")

![](/img/pasted-image-1782976718284.png "Top 10 Product Category")

![Order Trend by Hour](/img/pasted-image-1782976725061.png)

![](/img/pasted-image-1782976733698.png "Proportion of Late Deliveries")

## 5. Customer Segmentation with RFM

RFM (Recency, Frequency, Monetary) analysis is used to identify high-value customers based on how recently they transacted, how often, and how much they spend . This segmentation allows the marketing team to design more targeted retention strategies, such as a dedicated loyalty program for "Champion" customers and reactivation campaigns for customers who are becoming inactive.

![](/img/pasted-image-1782975658828.png "Recency, Frequency, Monetary (RFM) Analysis Plot")

The RFM analysis reveals that customer value varies considerably across recency, frequency, and monetary dimensions. The most loyal customer placed **17 orders**, while several others made between **7 and 9 purchases**, reflecting strong repeat purchasing behavior. Additionally, the top-spending customers generated substantially higher revenue than the average customer, highlighting their importance to overall business performance. Customers with the lowest recency values represent the most recently active buyers and are more likely to respond positively to retention initiatives. These findings enable the company to prioritize high-value customers for loyalty programs while identifying less active customers who may benefit from targeted reactivation campaigns.

## 6. From Notebook to Interactive Dashboard

All the findings above are now visualized _live_ and interactively in the form of a web dashboard, making it easier for non-technical stakeholders to explore the data without needing to read code.

**Access the dashboard here:** [E-Commerce Business Dashboard](https://business-dashboard-ecommerce-report-vfs74xf8azehmno3jlgblh.streamlit.app/)

This dashboard allows users to:

- Filter data by product category, price range, or payment method
- View daily/hourly order trends visually
- Interactively explore customer RFM segmentation
- Monitor delivery timeliness metrics in real time

## 7. Strategic Recommendations

Based on all the findings, here are actionable business recommendations:

- Optimize pricing strategy for best-selling product categories to remain competitive without sacrificing margins.
- Strengthen credit card payment infrastructure while educating customers on alternative methods to expand the customer base.
- Improve the logistics process for categories with high delay rates to maintain review scores.
- Design a dedicated retention program for the "Champion" customer segment identified through RFM analysis.
- Leverage peak ordering hours to schedule flash sale promotional campaigns.

## 8. Conclusion

This analysis notebook demonstrates that e-commerce transaction data holds business patterns that can be directly translated into operational and marketing decisions, and the interactive dashboard serves as the bridge that makes these insights easily and quickly accessible to all stakeholders.
