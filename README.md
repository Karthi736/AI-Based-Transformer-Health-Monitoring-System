# AI-Based Predictive Transformer Health Monitoring and Preventive Protection System Using Arduino UNO

<p align="center">
  <img src="./Images/Project_Banner.png" width="100%">
</p>

<p align="center">
  An intelligent transformer monitoring system using Arduino UNO for health prediction, risk classification, automatic cooling control, and preventive protection.
</p>

---

# Table of Contents

* [Overview](#overview)
* [Objectives](#objectives)
* [Features](#features)
* [Hardware Components](#hardware-components)
* [Software Requirements](#software-requirements)
* [System Architecture](#system-architecture)
* [Working Principle](#working-principle)
* [Health Score Calculation](#health-score-calculation)
* [Risk Classification](#risk-classification)
* [Protection Mechanism](#protection-mechanism)
* [Circuit Diagram](#circuit-diagram)
* [Flowchart](#flowchart)
* [Simulation](#simulation)
* [LCD Monitoring Output](#lcd-monitoring-output)
* [Results](#results)
* [Arduino Code](#arduino-code)
* [Repository Structure](#repository-structure)
* [Future Improvements](#future-improvements)
* [Conclusion](#conclusion)
* [Author](#author)
* [License](#license)

---

# Overview

Transformer is one of the most important components in electrical power systems. Transformer failures may cause power interruption, equipment damage, and increased maintenance costs.

This project presents an **AI-Based Predictive Transformer Health Monitoring and Preventive Protection System using Arduino UNO**.

The system continuously monitors transformer temperature and load conditions. Arduino UNO processes the collected data and calculates a **Transformer Health Score** to evaluate the operating condition.

Based on the health score, the system predicts the risk level and provides automatic protection using cooling control, relay operation, LED indication, and buzzer alerts.

---

# Objectives

* To monitor transformer temperature in real time.
* To simulate transformer load variations.
* To calculate transformer health condition.
* To estimate failure probability.
* To estimate remaining transformer life.
* To provide automatic cooling control.
* To implement preventive protection during abnormal conditions.

---

# Features

* Real-time temperature monitoring
* Load condition monitoring
* AI-based Health Score calculation
* Failure probability estimation
* Remaining life estimation
* Risk level prediction
* Automatic cooling control using servo motor
* Relay-based protection system
* LED warning indication
* Buzzer alert system
* Fault counting system
* LCD dashboard monitoring

---

# Hardware Components

| Component                | Purpose                    |
| ------------------------ | -------------------------- |
| Arduino UNO              | Main processing controller |
| DHT22 Temperature Sensor | Temperature measurement    |
| Potentiometer            | Load simulation            |
| 16x2 I2C LCD Display     | Status display             |
| Servo Motor              | Cooling simulation         |
| Relay Module             | Protection control         |
| LED                      | Warning indication         |
| Buzzer                   | Audio alert                |

---

# Software Requirements

| Software        | Purpose               |
| --------------- | --------------------- |
| Arduino IDE     | Program development   |
| Wokwi Simulator | Circuit simulation    |
| GitHub          | Project documentation |

---

# System Architecture

The proposed system consists of:

* Temperature Monitoring Module
* Load Monitoring Module
* Health Score Calculation Module
* Risk Prediction Module
* Cooling Control Module
* Protection Module
* LCD Display Module

<p align="center">
<img src="./Images/Block_Diagram.png" width="650">
</p>

---

# Working Principle

1. DHT22 sensor measures transformer temperature.
2. Potentiometer simulates transformer loading condition.
3. Arduino UNO receives sensor data.
4. Temperature and load values are processed.
5. Health Score is calculated.
6. Transformer risk category is identified.
7. Cooling and protection actions are automatically controlled.
8. LCD displays transformer health status.

---

# Health Score Calculation

The transformer condition is represented using a Health Score from **0 to 100**.

The Health Score depends on:

* Temperature level
* Load condition
* Abnormal operating conditions

A higher Health Score represents a healthier transformer condition.

---

# Risk Classification

| Health Score | Risk Level    |
| ------------ | ------------- |
| 80 - 100     | LOW Risk      |
| 50 - 79      | MEDIUM Risk   |
| 25 - 49      | HIGH Risk     |
| Below 25     | CRITICAL Risk |

---

# Protection Mechanism

## LOW Risk

* Normal operation
* Cooling OFF
* No warning indication

## MEDIUM Risk

* Increased monitoring
* Cooling assistance activated

## HIGH Risk

* Cooling system ON
* LED warning activated

## CRITICAL Risk

* Relay protection activated
* Buzzer alert enabled
* Fault condition recorded

---

# Circuit Diagram

<p align="center">
<img src="./Images/Circuit_Diagram.png" width="650">
</p>

---

# Flowchart

<p align="center">
<img src="./Images/Flowchart.png" width="550">
</p>

---

# Simulation

The project is simulated using the Wokwi simulation platform.

Simulation Link:

https://wokwi.com/projects/469066635947975681

---

# LCD Monitoring Output

## Normal Condition

<p align="center">
<img src="./Images/LCD_Normal.png" width="400">
</p>

---

## Transformer Status

<p align="center">
<img src="./Images/LCD_Status.png" width="400">
</p>

---

## Prediction Output

<p align="center">
<img src="./Images/LCD_Prediction.png" width="400">
</p>

---

## Critical Condition

<p align="center">
<img src="./Images/LCD_Critical.png" width="400">
</p>

---

# Results

The developed system successfully performs:

* Temperature monitoring
* Load monitoring
* Health Score calculation
* Risk classification
* Failure prediction
* Cooling control
* Relay protection
* Alert generation

The LCD dashboard provides real-time transformer condition monitoring.

---

# Arduino Code

Main Arduino program:

```text
Arduino_Code/
│
└── AI_Transformer_Health_Monitoring.ino
```

---

# Repository Structure

```text
AI-Based-Transformer-Health-Monitoring-System
│
├── Arduino_Code
│   └── AI_Transformer_Health_Monitoring.ino
│
├── Documentation
│   └── Project_Report.pdf
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
│
├── Simulation
│   └── Wokwi Simulation Link
│
└── README.md
```

---

# Future Improvements

* IoT-based remote transformer monitoring
* Mobile application integration
* Machine Learning prediction model
* Real transformer data analysis
* Cloud data storage
* Advanced fault diagnosis

---

# Conclusion

The **AI-Based Predictive Transformer Health Monitoring and Preventive Protection System using Arduino UNO** provides a low-cost and efficient solution for transformer condition monitoring.

The system continuously evaluates temperature and load conditions, predicts transformer health status, and provides preventive protection using automatic cooling and relay control.

This project demonstrates the implementation of intelligent monitoring techniques in electrical power systems.

---

# Author

**Karthikeyan M**

Department of Electrical and Electronics Engineering

V.S.B College of Engineering Technical Campus

Anna University

Academic Year: 2023–2027

---

# License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project for educational and research purposes with proper credit to the original author.
