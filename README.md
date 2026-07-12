<p align="center">
  <img src="Images/Project_Banner.png" alt="Project Banner" width="100%">
</p>

<h1 align="center">
AI-Based Predictive Transformer Health Monitoring and Preventive Protection System Using Arduino UNO
</h1>

<p align="center">
An intelligent embedded system for real-time transformer health monitoring, predictive risk analysis, automatic cooling control, and preventive protection using Arduino UNO.
</p>

<p align="center">

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Platform](https://img.shields.io/badge/Platform-Arduino%20UNO-00979D)
![Language](https://img.shields.io/badge/Language-Embedded%20C-orange)
![Simulation](https://img.shields.io/badge/Simulation-Wokwi-green)
![Project](https://img.shields.io/badge/Status-Completed-success)

</p>

---

# Overview

Transformers are among the most critical components in electrical power systems. Continuous operation under varying temperature and load conditions gradually degrades transformer health, which may eventually result in unexpected failures, expensive maintenance, and interruption of power supply.

The **AI-Based Predictive Transformer Health Monitoring and Preventive Protection System** has been developed to continuously monitor transformer operating conditions using an Arduino UNO. The system combines real-time temperature sensing and load monitoring to calculate a Transformer Health Score, estimate Failure Probability, predict Remaining Life, and classify the transformer into different operational risk levels.

Unlike conventional protection systems that react only after a fault occurs, this project provides **early prediction and preventive protection** by automatically activating a cooling mechanism and disconnecting the transformer through a relay whenever critical conditions are detected.

The complete project has been designed, programmed, simulated, tested, and documented using Arduino IDE, Embedded C, GitHub, and the Wokwi Online Simulator.

---

# Objectives

- Monitor transformer temperature continuously.
- Simulate transformer loading conditions.
- Calculate Transformer Health Score.
- Predict transformer operating condition.
- Estimate failure probability.
- Estimate transformer remaining life.
- Perform automatic cooling control.
- Implement relay-based preventive protection.
- Display real-time transformer parameters.
- Generate warning alerts using LED and buzzer.

---

# Key Features

- Real-Time Temperature Monitoring
- Transformer Load Monitoring
- AI-Based Health Score Calculation
- Failure Probability Prediction
- Remaining Life Estimation
- Four-Level Risk Classification
- Automatic Servo Cooling
- Relay Protection System
- LED Warning Indicator
- Buzzer Alarm
- Fault Counter
- LCD Dashboard
- Low Cost Embedded Design
- Fully Simulated using Wokwi

---

# Hardware Components

| Component | Purpose |
|------------|---------|
| Arduino UNO | Main Controller |
| DHT22 Sensor | Temperature Monitoring |
| Potentiometer | Load Simulation |
| 16×2 I2C LCD | Display Parameters |
| Servo Motor | Cooling System |
| Relay Module | Protection System |
| LED | Warning Indicator |
| Buzzer | Audible Alert |
| Breadboard | Circuit Assembly |
| Jumper Wires | Electrical Connections |

---

# Software Requirements

| Software | Purpose |
|-----------|---------|
| Arduino IDE | Embedded Programming |
| Embedded C | Program Development |
| Wokwi Simulator | Circuit Simulation |
| GitHub | Version Control & Documentation |

---

# System Architecture

The complete system consists of the following modules:

- Temperature Monitoring Module
- Load Monitoring Module
- Health Score Calculation Module
- Failure Prediction Module
- Remaining Life Estimation Module
- Risk Classification Module
- Cooling Control Module
- Relay Protection Module
- LCD Display Module
- Alert System

---

# Working Principle

1. The DHT22 continuously measures transformer temperature.
2. A potentiometer simulates transformer load variation.
3. Arduino UNO reads all sensor values.
4. Temperature and load values are processed.
5. Health Score is calculated.
6. Risk level is predicted.
7. Failure Probability is estimated.
8. Remaining Life is calculated.
9. Servo motor activates cooling automatically.
10. Relay disconnects transformer supply during critical conditions.
11. LED and buzzer provide warning indications.
12. LCD continuously displays system information.

---

# Health Score Calculation

Transformer Health Score varies between **0 and 100**.

Health Score depends on

- Temperature
- Load
- Operating Stress

Higher Health Score indicates better transformer condition.

---

# Risk Classification

| Health Score | Risk Level |
|-------------|------------|
| 80–100 | LOW |
| 50–79 | MEDIUM |
| 25–49 | HIGH |
| Below 25 | CRITICAL |

---

# Protection Strategy

## LOW Risk

- Normal Operation
- Cooling OFF
- Relay ON

## MEDIUM Risk

- Continuous Monitoring
- Early Warning

## HIGH Risk

- Servo Cooling Activated
- Warning Generated

## CRITICAL Risk

- Relay OFF
- LED ON
- Buzzer ON
- Fault Recorded

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

# Simulation

The complete project has been developed and tested using the **Wokwi Online Simulator**.

### Wokwi Simulation Link

https://wokwi.com/projects/469066635947975681

---

# LCD Monitoring Results

## Normal Condition

<p align="center">
<img src="Images/LCD_Normal.png" width="350">
</p>

---

## Transformer Status

<p align="center">
<img src="Images/LCD_Status.png" width="350">
</p>

---

## Prediction Output

<p align="center">
<img src="Images/LCD_Prediction.png" width="350">
</p>

---

## Critical Condition

<p align="center">
<img src="Images/LCD_Critical.png" width="350">
</p>

---

# Experimental Results

The developed system was tested under different transformer operating conditions.

Successfully verified:

- Temperature Monitoring
- Load Monitoring
- Health Score Calculation
- Risk Classification
- Failure Prediction
- Remaining Life Estimation
- Servo Cooling
- Relay Protection
- LED Warning
- Buzzer Alert
- LCD Dashboard
- Fault Counter

The experimental results confirm that the developed system successfully predicts transformer health and performs preventive protection before severe operating conditions occur.

---

# Repository Structure

```text
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
│   ├── Test_Result.md
│   ├── Test_Result_1_Normal.png
│   ├── Test_Result_2_Status.png
│   ├── Test_Result_3_Prediction.png
│   └── Test_Result_4_Critical.png
│
├── Simulation
│   └── Simulation_Link.txt
│
├── README.md
└── LICENSE
```

---

# Arduino Source Code

The complete Embedded C program is available inside

```
Arduino_Code/
AI_Transformer_Health_Monitoring.ino
```

---

# Future Improvements

- IoT Based Monitoring
- ESP32 Integration
- Cloud Dashboard
- Mobile Application
- GSM Alert System
- Machine Learning Prediction
- Smart Grid Integration
- Wireless Monitoring
- Multi Transformer Monitoring
- Advanced Fault Diagnosis

---

# Conclusion

The proposed **AI-Based Predictive Transformer Health Monitoring and Preventive Protection System Using Arduino UNO** provides an efficient, reliable, and economical solution for transformer condition monitoring.

By continuously monitoring temperature and load conditions, calculating transformer health, predicting failure probability, estimating remaining life, and automatically performing preventive protection, the system significantly improves transformer safety and operational reliability.

The project demonstrates the practical implementation of intelligent embedded systems for predictive maintenance and serves as a strong foundation for future IoT-enabled smart transformer monitoring systems.

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
