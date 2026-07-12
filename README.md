# AI-Based Predictive Transformer Health Monitoring and Preventive Protection System Using Arduino UNO

An intelligent transformer health monitoring system designed using **Arduino UNO** to predict transformer condition, estimate failure probability, classify operational risk levels, and perform automatic preventive protection through cooling and relay control.

---

## Overview

Transformers are one of the most critical components in electrical power systems. Unexpected transformer failures can interrupt power supply, increase maintenance costs, and damage electrical equipment.

This project presents a low-cost intelligent monitoring system capable of continuously observing transformer operating conditions and predicting its health before a critical failure occurs.

The system combines temperature monitoring and load monitoring to calculate a **Transformer Health Score**, estimate **Failure Probability**, classify the transformer into different **Risk Levels**, and automatically perform protective actions whenever unsafe operating conditions are detected.

The complete project has been developed using **Arduino UNO** and verified through the **Wokwi Online Simulator**.

---

## Project Objectives

- Monitor transformer temperature continuously.
- Simulate transformer loading conditions.
- Calculate Transformer Health Score.
- Predict transformer operating condition.
- Estimate failure probability.
- Estimate remaining transformer life.
- Automatically activate cooling mechanism.
- Perform relay-based preventive protection.
- Display live system parameters on LCD.
- Generate visual and audible alerts during critical conditions.

---

## Features

- Real-Time Temperature Monitoring
- Load Condition Monitoring
- AI-Based Health Score Calculation
- Transformer Risk Prediction
- Failure Probability Estimation
- Remaining Life Estimation
- Automatic Cooling Control
- Relay Protection System
- LED Warning Indication
- Buzzer Alarm
- Fault Counter
- Multi-Screen LCD Dashboard
- Low Cost Design
- Fully Simulated using Wokwi

---

## Hardware Components

| Component | Purpose |
|-----------|---------|
| Arduino UNO | Main Controller |
| DHT22 Sensor | Temperature Monitoring |
| Potentiometer | Load Simulation |
| 16×2 I2C LCD | Display System Parameters |
| Servo Motor | Cooling Fan Simulation |
| Relay Module | Transformer Protection |
| LED | Warning Indicator |
| Buzzer | Audible Alarm |
| Breadboard | Circuit Assembly |
| Jumper Wires | Connections |

---

## Software Requirements

| Software | Purpose |
|----------|---------|
| Arduino IDE | Program Development |
| Embedded C | Programming Language |
| Wokwi Simulator | Circuit Simulation |
| GitHub | Project Documentation |

---

## System Architecture

The complete system consists of the following modules:

- Temperature Monitoring Module
- Load Monitoring Module
- Health Score Calculation Module
- Risk Prediction Module
- Failure Probability Estimation Module
- Remaining Life Prediction Module
- Cooling Control Module
- Protection Module
- LCD Monitoring Module

---

## Working Principle

1. DHT22 continuously measures transformer temperature.
2. Potentiometer simulates transformer loading.
3. Arduino UNO reads both parameters.
4. Health Score is calculated.
5. Risk Level is predicted.
6. Failure Probability is estimated.
7. Remaining Life is calculated.
8. Servo motor activates cooling whenever temperature exceeds the predefined threshold.
9. Relay disconnects supply during critical conditions.
10. LED and buzzer provide warning indications.
11. LCD continuously displays transformer operating status.

---

## Health Score Calculation

Transformer Health Score ranges between **0 and 100**.

Health Score depends on:

- Temperature
- Load Condition
- Combined Operating Stress

Higher Health Score indicates healthier transformer condition.

---

## Risk Classification

| Health Score | Risk Level |
|-------------|------------|
| 80 – 100 | LOW |
| 50 – 79 | MEDIUM |
| 25 – 49 | HIGH |
| Below 25 | CRITICAL |

---

## Protection Strategy

### LOW Risk
- Normal operation
- Cooling OFF
- Relay ON

### MEDIUM Risk
- Continuous monitoring
- Early warning

### HIGH Risk
- Automatic cooling activated
- Increased monitoring

### CRITICAL Risk
- Relay Trip
- LED ON
- Buzzer ON
- Fault Counter Incremented

---

# Block Diagram

<p align="center">
<img src="Images/Block_Diagram.png" width="700">
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

## Simulation

The complete project has been simulated using the Wokwi Online Simulator.

**Simulation Link**

https://wokwi.com/projects/469066635947975681

---

# LCD Monitoring Results

## Normal Condition

<p align="center">
<img src="Images/LCD_Normal.png" width="350">
</p>

---

## System Status

<p align="center">
<img src="Images/LCD_Status.png" width="350">
</p>

---

## Prediction Screen

<p align="center">
<img src="Images/LCD_Prediction.png" width="350">
</p>

---

## Critical Condition

<p align="center">
<img src="Images/LCD_Critical.png" width="350">
</p>

---

## Experimental Results

The developed system was successfully tested under different transformer operating conditions.

### Successfully Verified

- Temperature Monitoring
- Load Monitoring
- Health Score Calculation
- Risk Prediction
- Remaining Life Estimation
- Failure Probability Estimation
- Cooling Control
- Relay Protection
- LED Alert
- Buzzer Alert
- LCD Dashboard
- Fault Counter

---

## Repository Structure

```
AI-Based-Transformer-Health-Monitoring-System
│
├── Arduino_Code
│   └── AI_Transformer_Health_Monitoring.ino
│
├── Documentation
│   ├── Project_Report.pdf
│   ├── Abstract.md
│   └── Methodology.md
│
├── Images
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

## Arduino Source Code

The complete Embedded C source code is available in:

```
Arduino_Code/
AI_Transformer_Health_Monitoring.ino
```

---

## Future Improvements

- IoT-Based Monitoring
- ESP32 Integration
- Cloud Data Logging
- Mobile Application
- Machine Learning Prediction
- GSM Alert System
- Real Transformer Deployment
- Multi-Transformer Monitoring

---

## Conclusion

The proposed AI-Based Predictive Transformer Health Monitoring and Preventive Protection System provides an intelligent and economical solution for monitoring transformer operating conditions.

Unlike conventional protection systems that only respond after a fault occurs, this system predicts transformer health using multiple operating parameters and performs preventive protection before severe damage can occur.

The project demonstrates how embedded systems can be used to improve transformer reliability, reduce maintenance costs, and enhance operational safety.

---

## Author

**Karthikeyan M**

Department of Electrical and Electronics Engineering

V.S.B College of Engineering Technical Campus

Anna University

Academic Year: **2025 – 2026**

---

## License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for educational and research purposes with proper attribution to the original author.
