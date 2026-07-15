# Smart Transformer Health Monitoring and Preventive Protection System Using Arduino UNO

<p align="center">
  <img src="Images/Project_Banner.png" alt="Project Banner" width="100%">
</p>

---

<p align="center">

![Platform](https://img.shields.io/badge/Platform-Arduino_UNO-blue?style=for-the-badge)
![Language](https://img.shields.io/badge/Language-C%2FC%2B%2B-orange?style=for-the-badge)
![IDE](https://img.shields.io/badge/IDE-Arduino_IDE-green?style=for-the-badge)
![Electronics](https://img.shields.io/badge/Domain-Embedded_Systems-red?style=for-the-badge)
![KiCad](https://img.shields.io/badge/PCB-KiCad-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

</p>

---

# Project Overview

The **Smart Transformer Health Monitoring and Preventive Protection System Using Arduino UNO** is an embedded systems project designed to continuously monitor the operating condition of a transformer and automatically perform preventive protection when abnormal conditions are detected.

The system measures transformer temperature using a **DHT22 temperature sensor** and simulates transformer loading through a **potentiometer**. Based on these real-time operating parameters, it calculates a **Transformer Health Score**, classifies the operational risk level, and activates appropriate protection mechanisms.

The monitoring information is displayed on a **16×2 I2C LCD**, while protection devices including a **servo motor**, **relay module**, **LED**, and **buzzer** respond automatically according to the current transformer condition.

This project demonstrates practical applications of:

* Embedded Systems
* Electrical Protection
* Arduino Programming
* Sensor Interfacing
* Preventive Monitoring
* Industrial Automation Concepts

---

# Objectives

* Monitor transformer temperature in real time.
* Simulate transformer loading conditions.
* Calculate a Transformer Health Score.
* Classify transformer operating risk.
* Provide visual and audible fault indications.
* Automatically activate cooling during abnormal conditions.
* Disconnect the transformer under critical conditions.
* Display real-time operational information on an LCD.
* Improve transformer operational safety using smart preventive protection.

---

# Key Features

| Feature                          | Description                                                         |
| -------------------------------- | ------------------------------------------------------------------- |
| Real-Time Temperature Monitoring | Measures transformer temperature using DHT22                        |
| Load Monitoring                  | Simulates transformer loading using potentiometer                   |
| Transformer Health Score         | Calculates overall transformer condition                            |
| Risk Level Classification        | Categorizes operating condition into different risk levels          |
| Smart Preventive Protection      | Automatically performs protection actions based on system condition |
| Automatic Cooling                | Activates servo-controlled cooling mechanism                        |
| Relay-Based Protection           | Disconnects transformer during critical conditions                  |
| LCD Dashboard                    | Displays live system information                                    |
| LED Warning                      | Visual indication of abnormal operating conditions                  |
| Buzzer Alert                     | Audible alarm during fault conditions                               |
| Fault Counter                    | Counts detected abnormal operating events                           |

---

# Hardware Components

| Component                | Quantity    |
| ------------------------ | ----------- |
| Arduino UNO              | 1           |
| DHT22 Temperature Sensor | 1           |
| Potentiometer            | 1           |
| 16×2 I2C LCD             | 1           |
| Servo Motor              | 1           |
| Relay Module             | 1           |
| LED                      | 1           |
| Buzzer                   | 1           |
| Breadboard               | 1           |
| Jumper Wires             | As Required |
| USB Cable                | 1           |

---

# Software Requirements

| Software    | Purpose             |
| ----------- | ------------------- |
| Arduino IDE | Program Development |
| KiCad       | PCB Design          |
| Git         | Version Control     |
| GitHub      | Repository Hosting  |

---

# System Architecture

```
                 +----------------------+
                 |   Transformer Model  |
                 +----------+-----------+
                            |
          +-----------------+-----------------+
          |                                   |
          |                                   |
   DHT22 Temperature                 Potentiometer
      Sensor                          Load Simulation
          |                                   |
          +-----------------+-----------------+
                            |
                      Arduino UNO
                            |
        +-------------------+----------------------+
        |                   |                      |
        |                   |                      |
      LCD              Servo Motor            Relay Module
        |                   |                      |
        |                   |                      |
     Dashboard          Cooling              Protection
                            |
                     LED & Buzzer
```

---

# Working Principle

1. The DHT22 sensor continuously measures transformer temperature.
2. The potentiometer simulates transformer loading conditions.
3. Arduino reads both sensor values.
4. A Transformer Health Score is calculated using the measured parameters.
5. The system classifies the transformer operating condition into predefined risk levels.
6. According to the detected risk:

   * LCD updates the current status.
   * LED indicates warning conditions.
   * Buzzer generates audible alerts.
   * Servo motor activates cooling.
   * Relay disconnects the transformer during critical conditions.
7. Fault events are counted and displayed for monitoring purposes.

---

# Transformer Health Score Calculation

The Transformer Health Score represents the overall operating condition of the transformer by evaluating monitored parameters such as:

* Temperature
* Simulated Load

A higher score indicates a healthier operating condition, while lower scores indicate increasing operational risk.

The calculated score is used to support:

* Real-time monitoring
* Risk level classification
* Smart preventive protection decisions

---

# Risk Classification

| Health Condition | Risk Level | System Status                   |
| ---------------- | ---------- | ------------------------------- |
| Healthy          | Low        | Normal Operation                |
| Moderate         | Medium     | Warning                         |
| Poor             | High       | Preventive Protection Activated |
| Critical         | Critical   | Relay Protection Activated      |

---

# Smart Preventive Protection

The system automatically performs protection actions depending on the detected operating condition.

| Condition | Protection Action                         |
| --------- | ----------------------------------------- |
| Normal    | Monitoring Only                           |
| Warning   | LED Warning                               |
| High Risk | Cooling Activated                         |
| Critical  | Cooling + Relay Protection + Buzzer Alert |

---

# Block Diagram

<p align="center">
<img src="Images/Block_Diagram.png" width="900">
</p>

---

# Circuit Diagram

<p align="center">
<img src="Images/Circuit_Diagram.png" width="900">
</p>

---

# Flowchart

<p align="center">
<img src="Images/Flowchart.png" width="900">
</p>

---

# PCB Design

## Schematic

<p align="center">
<img src="KiCad/Schematic.png" width="900">
</p>

### PCB Layout

<p align="center">
<img src="KiCad/PCB_Layout.png" width="900">
</p>

### PCB 3D View

<p align="center">
<img src="KiCad/PCB_3D_View.png" width="900">
</p>

---

# Simulation

Simulation files and related documentation are available inside the **Simulation/** directory.

```
Simulation/
└── README.md
```

---

# LCD Dashboard

### Normal Display

<p align="center">
<img src="Images/LCD_Normal.png" width="500">
</p>

### Status Display

<p align="center">
<img src="Images/LCD_Status.png" width="500">
</p>

### Health Score Display

<p align="center">
<img src="Images/LCD_Prediction.png" width="500">
</p>

### Critical Condition Display

<p align="center">
<img src="Images/LCD_Critical.png" width="500">
</p>

---

# Experimental Results

The implemented prototype successfully demonstrates:

* Real-time temperature monitoring
* Load monitoring
* Transformer Health Score calculation
* Risk level classification
* Automatic cooling activation
* Relay-based preventive protection
* LCD status visualization
* LED warning indication
* Buzzer alert generation
* Fault counting

---

# Test Results

| Test Case                | Result |
| ------------------------ | ------ |
| Temperature Monitoring   | Passed |
| Load Monitoring          | Passed |
| LCD Display              | Passed |
| Health Score Calculation | Passed |
| Risk Classification      | Passed |
| Cooling Activation       | Passed |
| Relay Protection         | Passed |
| LED Warning              | Passed |
| Buzzer Alert             | Passed |
| Fault Counter            | Passed |

### Sample Outputs

<p align="center">
<img src="Results/Test_Result_1_Normal.png" width="700">
</p>

<p align="center">
<img src="Results/Test_Result_2_Status.png" width="700">
</p>

<p align="center">
<img src="Results/Test_Result_3_Prediction.png" width="700">
</p>

<p align="center">
<img src="Results/Test_Result_4_Critical.png" width="700">
</p>

---

# Project Documentation

| Document                                              | Description               |
| ----------------------------------------------------- | ------------------------- |
| Abstract.md                                           | Project Abstract          |
| Methodology.md                                        | Development Methodology   |
| Project_Report.pdf                                    | Complete Technical Report |
| Smart_Transformer_Health_Monitoring_Presentation.pptx | Project Presentation      |

---

# Repository Structure

```text
Smart-Transformer-Health-Monitoring-System/
│
├── Arduino_Code/
│   └── Smart_Transformer_Health_Monitoring.ino
│
├── Documentation/
│   ├── Abstract.md
│   ├── Methodology.md
│   ├── Project_Report.pdf
│   └── Smart_Transformer_Health_Monitoring_Presentation.pptx
│
├── Images/
│   ├── Project_Banner.png
│   ├── Block_Diagram.png
│   ├── Circuit_Diagram.png
│   ├── Flowchart.png
│   ├── LCD_Normal.png
│   ├── LCD_Status.png
│   ├── LCD_Prediction.png
│   └── LCD_Critical.png
│
├── KiCad/
│   ├── README.md
│   ├── Schematic.png
│   ├── PCB_Layout.png
│   ├── PCB_3D_View.png
│   ├── Smart Transformer Health Monitoring and Preventive Protection System.kicad_pro
│   ├── Smart Transformer Health Monitoring and Preventive Protection System.kicad_sch
│   └── Smart Transformer Health Monitoring and Preventive Protection System.kicad_pcb
│
├── Results/
│   ├── Test_Result.md
│   ├── Test_Result_1_Normal.png
│   ├── Test_Result_2_Status.png
│   ├── Test_Result_3_Prediction.png
│   └── Test_Result_4_Critical.png
│
├── Simulation/
│   └── README.md
│
├── LICENSE
└── README.md
```

---

# KiCad Folder Structure

```text
KiCad/
│
├── README.md
├── Schematic.png
├── PCB_Layout.png
├── PCB_3D_View.png
├── Smart Transformer Health Monitoring and Preventive Protection System.kicad_pro
├── Smart Transformer Health Monitoring and Preventive Protection System.kicad_sch
└── Smart Transformer Health Monitoring and Preventive Protection System.kicad_pcb
```

---

# Future Improvements

* Support additional transformer monitoring sensors.
* Add voltage and current measurement modules.
* Integrate data logging using an SD card.
* Enable wireless monitoring using Wi-Fi or GSM modules.
* Develop a web or mobile dashboard for remote monitoring.
* Implement cloud-based historical data storage.
* Expand fault diagnostics with additional electrical parameters.

---

# Conclusion

The **Smart Transformer Health Monitoring and Preventive Protection System Using Arduino UNO** demonstrates an effective embedded monitoring solution for transformer condition assessment. By combining real-time temperature monitoring, load simulation, Transformer Health Score calculation, risk level classification, and automated preventive protection, the system enhances operational awareness and equipment safety. Its modular design makes it suitable as an educational project and a practical foundation for future transformer monitoring and protection systems.

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

See the **LICENSE** file for more information.
