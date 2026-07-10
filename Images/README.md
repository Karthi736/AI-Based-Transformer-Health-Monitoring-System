# AI-Based Predictive Transformer Health Monitoring and Preventive Protection System Using Arduino UNO

![Project Banner](./Images/Block_Diagram.png)

## Overview

Transformer is one of the most important components in electrical power systems. Unexpected transformer failures can cause power interruption, maintenance difficulties, and increased operational costs.

This project presents an **AI-Based Predictive Transformer Health Monitoring and Preventive Protection System using Arduino UNO**.

The system continuously monitors transformer temperature and load conditions. Based on the collected parameters, Arduino UNO calculates a **Transformer Health Score**, estimates failure probability, and classifies the transformer risk level.

The system provides automatic cooling control, relay-based protection, LED indication, buzzer alert, and real-time monitoring through a 16x2 I2C LCD display.

---

# Table of Contents

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
* [LCD Output](#lcd-output)
* [Results](#results)
* [Arduino Code](#arduino-code)
* [Future Improvements](#future-improvements)
* [Conclusion](#conclusion)
* [Author](#author)
* [License](#license)

---

# Objectives

* To monitor transformer temperature in real time.
* To simulate transformer loading conditions.
* To calculate transformer health condition using sensor parameters.
* To predict possible failure conditions.
* To estimate remaining transformer life.
* To provide automatic cooling control.
* To protect the transformer during critical conditions.

---

# Features

* Real-time temperature monitoring
* Load condition monitoring
* AI-based Health Score calculation
* Failure probability estimation
* Remaining life estimation
* Risk level classification
* Automatic cooling control using servo motor
* Relay-based protection system
* LED warning indication
* Buzzer alert system
* Fault counter
* LCD dashboard monitoring

---

# Hardware Components

| Component                | Purpose                   |
| ------------------------ | ------------------------- |
| Arduino UNO              | Main processing unit      |
| DHT22 Temperature Sensor | Temperature measurement   |
| Potentiometer            | Load simulation           |
| 16x2 I2C LCD Display     | Status monitoring         |
| Servo Motor              | Cooling system simulation |
| Relay Module             | Protection control        |
| LED                      | Warning indication        |
| Buzzer                   | Alarm indication          |

---

# Software Requirements

| Software        | Purpose               |
| --------------- | --------------------- |
| Arduino IDE     | Program development   |
| Wokwi Simulator | Circuit simulation    |
| GitHub          | Project documentation |

---

# System Architecture

The proposed system consists of different modules:

* Temperature Monitoring Module
* Load Monitoring Module
* Health Score Processing Module
* Prediction Module
* Cooling Control Module
* Protection Module
* LCD Display Module

<img src="./Images/Block_Diagram.png" width="600">

---

# Working Principle

1. The DHT22 sensor measures transformer temperature.
2. The potentiometer simulates transformer load variation.
3. Arduino UNO collects temperature and load data.
4. The system processes the input values.
5. Health Score is calculated based on operating conditions.
6. Transformer risk level is classified.
7. Cooling and protection actions are automatically controlled.
8. LCD displays the transformer health status.

---

# Health Score Calculation

The transformer health condition is represented using a Health Score from **0 to 100**.

The Health Score depends on:

* Temperature condition
* Load condition
* Abnormal operating conditions

A higher Health Score indicates better transformer health.

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

* Normal transformer operation
* Cooling system OFF
* No warning alert

## MEDIUM Risk

* Increased monitoring
* Cooling assistance activated

## HIGH Risk

* Cooling system ON
* LED warning indication

## CRITICAL Risk

* Relay protection activated
* Buzzer alert enabled
* Fault condition recorded

---

# Circuit Diagram

<img src="./Images/Circuit_Diagram.png" width="600">

---

# Flowchart

<img src="./Images/Flowchart.png" width="500">

---

# Simulation

The project is simulated using the Wokwi online simulation platform.

Simulation Link:

https://wokwi.com/projects/469066635947975681

---

# LCD Output

## Normal Condition

<img src="./Images/LCD_Normal.png" width="400">

## Transformer Status

<img src="./Images/LCD_Status.png" width="400">

## Prediction Output

<img src="./Images/LCD_Prediction.png" width="400">

## Critical Condition

<img src="./Images/LCD_Critical.png" width="400">

---

# Results

The developed system successfully performs:

* Temperature monitoring
* Load condition monitoring
* Transformer health score calculation
* Risk classification
* Failure probability estimation
* Cooling control
* Relay protection
* Alert generation

The LCD dashboard provides real-time transformer health information.

---

# Arduino Code

The complete Arduino program is available in:

```
Arduino_Code/
│
└── AI_Transformer_Health_Monitoring.ino
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
│   └── Project Report PDF
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
│
├── Simulation
│   └── Wokwi Simulation Link
│
└── README.md
```

---

# Future Improvements

* IoT-based remote monitoring
* Mobile application integration
* Machine Learning prediction model
* Real transformer data analysis
* Cloud data storage
* Advanced fault diagnosis

---

# Conclusion

The **AI-Based Predictive Transformer Health Monitoring and Preventive Protection System using Arduino UNO** provides an efficient and low-cost solution for transformer condition monitoring.

The system monitors temperature and load conditions, predicts transformer health status, and provides preventive protection through automatic cooling and relay operation.

This project demonstrates the application of intelligent monitoring techniques in electrical power systems.

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

