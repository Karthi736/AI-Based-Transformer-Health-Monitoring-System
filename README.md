# AI-Based Predictive Transformer Health Monitoring and Preventive Protection System Using Arduino UNO

<p align="center">
<img src="Images/Project_Banner.png" width="900">
</p>

An intelligent transformer monitoring and predictive protection system developed using **Arduino UNO**. The system continuously monitors transformer temperature and load, calculates a **Health Score**, predicts transformer condition, estimates failure probability, controls automatic cooling, and provides preventive protection through relay operation.

---

## Project Overview

Transformers are one of the most critical components in electrical power systems. Unexpected transformer failures may cause power interruption, equipment damage, and high maintenance costs.

This project presents an **AI-Based Predictive Transformer Health Monitoring and Preventive Protection System** using Arduino UNO.

The system continuously monitors transformer temperature and load conditions using sensors. Based on these parameters, it calculates a transformer **Health Score**, predicts transformer risk level, estimates failure probability, and determines the remaining life of the transformer.

Whenever abnormal operating conditions are detected, the system automatically activates cooling, generates warning indications, and disconnects the transformer using a relay during critical situations.

---

# Objectives

- Monitor transformer temperature continuously.
- Simulate transformer load conditions.
- Calculate transformer Health Score.
- Predict transformer operating condition.
- Estimate failure probability.
- Estimate remaining transformer life.
- Provide automatic cooling control.
- Implement relay-based preventive protection.
- Generate LED and buzzer alerts.
- Display real-time information on LCD.

---

# Features

- Real-time Temperature Monitoring
- Load Condition Monitoring
- AI-Based Health Score Calculation
- Failure Probability Estimation
- Remaining Life Prediction
- Four-Level Risk Classification
- Automatic Cooling Control
- Relay-Based Protection
- LED Warning Indication
- Buzzer Alert System
- LCD Dashboard
- Fault Counting Mechanism

---

# Hardware Components

| Component | Purpose |
|------------|-------------------------------|
| Arduino UNO | Main Controller |
| DHT22 Sensor | Temperature Monitoring |
| Potentiometer | Load Simulation |
| 16×2 I2C LCD | System Dashboard |
| Servo Motor | Cooling System |
| Relay Module | Transformer Protection |
| LED | Visual Alert |
| Buzzer | Audio Alert |

---

# Software Requirements

| Software | Purpose |
|------------|------------------------------|
| Arduino IDE | Embedded Programming |
| Wokwi Simulator | Circuit Simulation |
| GitHub | Project Documentation |

---

# System Architecture

The complete system consists of the following modules:

- Temperature Monitoring Module
- Load Monitoring Module
- Health Score Calculation Module
- Risk Prediction Module
- Cooling Control Module
- Protection Module
- LCD Monitoring Module

---

# Working Principle

1. DHT22 continuously measures transformer temperature.
2. Potentiometer simulates transformer load.
3. Arduino UNO receives sensor values.
4. Temperature and load are processed.
5. Health Score is calculated.
6. Risk level is predicted.
7. Failure probability is estimated.
8. Remaining life is calculated.
9. Servo controls cooling automatically.
10. Relay disconnects transformer during critical conditions.
11. LCD continuously displays transformer status.

---

# Health Score Calculation

The transformer condition is represented using a **Health Score** between **0 and 100**.

The Health Score depends on:

- Transformer Temperature
- Transformer Load
- Abnormal Operating Conditions

Higher Health Score indicates healthier transformer condition.

---

# Risk Classification

| Health Score | Risk Level |
|---------------|------------|
| 80 – 100 | LOW |
| 50 – 79 | MEDIUM |
| 25 – 49 | HIGH |
| Below 25 | CRITICAL |

---

# Protection Mechanism

### LOW Risk
- Normal Operation
- Cooling OFF
- Relay ON

### MEDIUM Risk
- Continuous Monitoring
- Early Warning

### HIGH Risk
- Automatic Cooling Activated
- System Monitoring Increased

### CRITICAL Risk
- Relay Protection Activated
- LED ON
- Buzzer ON
- Fault Counter Updated

---

# Block Diagram

<p align="center">
<img src="Images/Block_Diagram.png" width="800">
</p>

---

# Circuit Diagram

<p align="center">
<img src="Images/Circuit_Diagram.png" width="900">
</p>

---

# Flowchart

<p align="center">
<img src="Images/Flowchart.png" width="700">
</p>

---

# Simulation

The complete project was designed and verified using the **Wokwi Online Simulator**.

### Simulation Link

https://wokwi.com/projects/469066635947975681

---

# LCD Dashboard

## Normal Condition

<p align="center">
<img src="Images/LCD_Normal.png" width="500">
</p>

---

## Status Monitoring

<p align="center">
<img src="Images/LCD_Status.png" width="500">
</p>

---

## Prediction Output

<p align="center">
<img src="Images/LCD_Prediction.png" width="500">
</p>

---

## Critical Condition

<p align="center">
<img src="Images/LCD_Critical.png" width="500">
</p>

---

# Experimental Results

The developed system was tested under different transformer operating conditions.

The project successfully performs:

- Temperature Monitoring
- Load Monitoring
- Health Score Calculation
- Risk Prediction
- Remaining Life Estimation
- Failure Probability Estimation
- Automatic Cooling
- Relay Protection
- LED & Buzzer Alert
- LCD Dashboard Monitoring

---

# Test Results

| Temperature | Load | Health Score | Risk Level | Relay |
|--------------|------|--------------|------------|-------|
| 32°C | 40% | 100 | LOW | ON |
| 75°C | 40% | 48 | HIGH | ON |
| 32°C | 100% | 70 | MEDIUM | ON |
| 80°C | 95% | 16 | CRITICAL | OFF |

---

# Project Documentation

Complete project documents are available inside the **Documentation** folder.

```
Documentation/
│
├── Project_Report.pdf
├── AI_Based_Transformer_Health_Monitoring_Presentation.pptx
├── Abstract.md
└── Methodology.md
```

---

# Repository Structure

```
AI-Based-Transformer-Health-Monitoring-System
│
├── Arduino_Code
│   └── AI_Transformer_Health_Monitoring.ino
│
├── Documentation
│   ├── Project_Report.pdf
│   ├── AI_Based_Transformer_Health_Monitoring_Presentation.pptx
│   ├── Abstract.md
│   └── Methodology.md
│
├── Images
│   ├── Project_Banner.png
│   ├── Block_Diagram.png
│   ├── Circuit_Diagram.png
│   ├── Flowchart.png
│   ├── LCD_Normal.png
│   ├── LCD_Status.png
│   ├── LCD_Prediction.png
│   └── LCD_Critical.png
│
├── Results
│   └── Test_Result.md
│
├── Simulation
│   └── Simulation_Link.txt
│
├── README.md
└── LICENSE
```

---

# Future Improvements

- IoT-Based Remote Monitoring
- ESP32 Integration
- Cloud Data Logging
- Mobile Application
- Machine Learning Prediction
- Multiple Transformer Monitoring
- Advanced Fault Diagnosis

---

# Conclusion

The **AI-Based Predictive Transformer Health Monitoring and Preventive Protection System** provides an efficient and low-cost solution for intelligent transformer condition monitoring.

The system continuously monitors transformer temperature and load conditions, calculates a Health Score, predicts transformer health, estimates failure probability, controls automatic cooling, and performs relay-based preventive protection during critical operating conditions.

This project demonstrates the practical application of predictive monitoring techniques for improving transformer reliability and safety.

---

# Author

**Karthikeyan M**

Department of Electrical and Electronics Engineering

V.S.B College of Engineering Technical Campus

Anna University

Academic Year: **2025–2026**

---

# License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for educational and research purposes with proper credit to the original author.
