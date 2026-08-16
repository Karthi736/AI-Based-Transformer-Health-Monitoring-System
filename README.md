# Industrial Transformer Health Monitoring SCADA System

A real-time transformer health monitoring and preventive protection system built using ESP32, sensors, Firebase, and an industrial-style SCADA web dashboard.

The system continuously monitors transformer operating parameters, evaluates transformer health, classifies risk levels, activates preventive protection during critical conditions, and provides remote monitoring through a SCADA dashboard.

---

## 📌 Project Overview

Transformers are critical components in electrical power systems. Abnormal temperature, excessive loading, and other operating conditions can affect transformer performance and reliability.

This project provides a smart monitoring approach using an ESP32-based edge controller.

The ESP32 collects transformer condition parameters, processes the data, calculates a health score, determines the risk level, and activates preventive protection when critical conditions are detected.

The monitoring data is transmitted through Wi-Fi to Firebase and visualized through a web-based SCADA dashboard.

### Main Data Flow

**Transformer → Sensors → ESP32 → Health Assessment → Risk Analysis → Protection → Firebase → SCADA Dashboard**

---

## 🎯 Objectives

- Monitor transformer operating conditions in real time.
- Measure temperature and humidity.
- Simulate transformer load conditions.
- Calculate an overall transformer health score.
- Classify transformer condition into different risk levels.
- Provide automatic preventive protection.
- Control cooling based on transformer condition.
- Generate visual and audible alarms.
- Store monitoring data in Firebase.
- Provide remote monitoring through a SCADA web dashboard.
- Support monitoring of multiple transformer units.

---

## ⚙️ Key Features

### Real-Time Monitoring

The system continuously monitors:

- Temperature
- Humidity
- Load Percentage
- Health Score
- Risk Level
- Relay Status
- Cooling Status
- Alarm Status
- Fault Count
- Transformer Status

### Health Assessment

The ESP32 processes the monitored parameters and calculates a transformer health score.

### Risk Classification

The transformer condition is classified into four levels:

| Health Score | Risk Level | Response |
|---|---|---|
| 80 – 100 | LOW | Normal Monitoring |
| 50 – 79 | MEDIUM | Warning Monitoring |
| 25 – 49 | HIGH | Warning / Preventive Action |
| Below 25 | CRITICAL | Protection Activated |

### Preventive Protection

During critical conditions, the system can:

- Activate relay protection
- Activate servo-based cooling
- Turn ON LED warning
- Activate buzzer alarm
- Update LCD status
- Update Firebase data
- Display the critical condition on the SCADA dashboard

---

## 🔌 Hardware Components

| Component | Purpose |
|---|---|
| ESP32 | Main monitoring and control unit |
| DHT22 | Temperature and humidity monitoring |
| Potentiometer | Transformer load simulation |
| 16×2 I2C LCD | Local parameter display |
| Relay Module | Preventive protection |
| Servo Motor | Cooling control |
| LED | Visual warning |
| Buzzer | Audible alarm |

---

## 💻 Software & Technologies

- ESP32
- Arduino IDE
- Embedded C / Arduino Programming
- Wi-Fi
- Firebase
- HTML
- CSS
- JavaScript
- SCADA Web Dashboard
- Online Electronics Simulation Platform

---

## ☁️ Firebase Integration

The ESP32 communicates with Firebase through Wi-Fi.

The cloud layer stores and provides transformer monitoring information for the SCADA dashboard.

The transmitted parameters include:

- Temperature
- Humidity
- Load Percentage
- Health Score
- Risk Level
- Relay Status
- Cooling Status
- Alarm Status
- Fault Count
- Transformer Status

### Communication Flow

**ESP32 → Wi-Fi → Firebase → SCADA Web Dashboard**

---

## 🖥️ SCADA Dashboard

The web-based SCADA dashboard provides remote visualization of transformer operating conditions.

The dashboard includes:

- Transformer identification
- Real-time temperature
- Humidity
- Load percentage
- Health score
- Risk level
- Relay status
- Cooling status
- Alarm status
- Fault count
- Transformer operating status

The dashboard is designed with an industrial monitoring interface for easy visualization of transformer conditions.

---

## 🔧 Multiple Transformer Monitoring

The system architecture supports multiple transformer monitoring units.

The simulation includes:

- TR-001
- TR-002
- TR-003
- TR-004

Each transformer can be monitored separately through the SCADA dashboard.

---

## 🧪 Simulation

The system was tested using an online electronics simulation environment with an ESP32-based monitoring setup.

The simulation demonstrates:

1. ESP32 initialization
2. Sensor data acquisition
3. Temperature and humidity monitoring
4. Load percentage simulation
5. Health score calculation
6. Risk classification
7. LCD monitoring
8. Preventive protection
9. Cooling control
10. Alarm generation
11. Firebase communication
12. SCADA dashboard visualization

### Simulation Test Conditions

#### Normal Condition

Low temperature and normal load are applied.

**Expected response:**

- LOW risk
- Normal monitoring
- Relay remains inactive
- Cooling remains inactive
- Alarm remains OFF

#### Warning Condition

Temperature or load is increased.

**Expected response:**

- Health score decreases
- Risk level increases
- Warning indication is generated
- LCD displays updated condition

#### Critical Condition

Temperature and/or load reaches a critical level.

**Expected response:**

- CRITICAL risk detected
- Relay protection activated
- Servo cooling activated
- LED activated
- Buzzer activated
- Firebase updated
- SCADA dashboard displays critical status

---

## 📊 System Architecture

The system consists of four major layers:

### 1. Field / Transformer Layer

- Transformer units
- Temperature and humidity sensing
- Load simulation

### 2. Edge Control Layer

- ESP32
- Sensor data acquisition
- Data processing
- Health score calculation
- Risk classification
- Protection decision

### 3. Local Protection Layer

- LCD
- Relay
- Servo cooling
- LED
- Buzzer

### 4. Cloud & SCADA Layer

- Wi-Fi
- Firebase
- SCADA web dashboard
- Remote monitoring
- Status visualization

---

## 📁 Repository Structure

```text
Industrial-Transformer-Health-Monitoring-SCADA-System/
│
├── Dashboard/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Documentation/
│   ├── Block_Diagram.png
│   ├── Circuit_Diagram.png
│   ├── Flowchart.png
│   ├── System_Architecture.png
│   └── Simulation_Details.md
│
├── Images/
│   └── Project images and dashboard screenshots
│
├── Simulation/
│   └── Transformer simulation files
│
├── simulator/
│   └── Firebase / simulator configuration files
│
├── README.md
└── LICENSE
