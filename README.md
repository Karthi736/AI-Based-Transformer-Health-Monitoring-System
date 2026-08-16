# Industrial Transformer Health Monitoring SCADA System

A real-time transformer health monitoring and preventive protection system developed using ESP32, sensors, Firebase, and a web-based industrial SCADA dashboard.

The system continuously monitors transformer operating parameters, evaluates transformer health, classifies risk levels, activates preventive protection during critical conditions, and provides remote monitoring through a SCADA dashboard.

---

## 1. Project Overview

Transformers are critical components in electrical power systems. Abnormal temperature, excessive loading, and other operating conditions can affect transformer performance, reliability, and operational safety.

The Industrial Transformer Health Monitoring SCADA System provides a smart monitoring and preventive protection approach using an ESP32-based edge controller.

The ESP32 collects transformer condition parameters, processes the collected data, calculates a health score, determines the corresponding risk level, and activates preventive protection when critical conditions are detected.

The monitoring data is transmitted through Wi-Fi to Firebase and visualized through a web-based SCADA dashboard.

### Main Data Flow

**Transformer → Sensors → ESP32 → Health Assessment → Risk Analysis → Protection → Firebase → SCADA Dashboard**

---

## 2. Objectives

The main objectives of the project are:

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

## 3. Key Features

### Real-Time Transformer Monitoring

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

The ESP32 processes the monitored parameters and calculates a transformer health score to represent the overall operating condition.

### Risk Classification

The transformer condition is classified into four levels:

| Health Score | Risk Level | System Response |
|---|---|---|
| 80 – 100 | LOW | Normal Monitoring |
| 50 – 79 | MEDIUM | Warning Monitoring |
| 25 – 49 | HIGH | Warning / Preventive Action |
| Below 25 | CRITICAL | Protection Activated |

### Preventive Protection

During critical conditions, the system can:

- Activate relay protection.
- Activate servo-based cooling.
- Turn ON the LED warning indicator.
- Activate the buzzer alarm.
- Update the LCD status.
- Update Firebase data.
- Display the critical condition on the SCADA dashboard.

---

## 4. Hardware Components

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

## 5. Software and Technologies

- ESP32
- Arduino IDE
- Embedded C / Arduino Programming
- Wi-Fi
- Firebase
- HTML
- CSS
- JavaScript
- Web-based SCADA Dashboard
- Online Electronics Simulation Environment

---

## 6. System Architecture

The system consists of four major layers.

### 6.1 Transformer and Field Layer

This layer represents the monitored transformer units and their operating parameters.

The monitored parameters include:

- Temperature
- Humidity
- Load

### 6.2 Edge Control Layer

The ESP32 acts as the main edge controller.

Its responsibilities include:

- Sensor data acquisition
- Data processing
- Health score calculation
- Risk classification
- Protection decision
- Local status control
- Firebase communication

### 6.3 Local Protection Layer

The local protection system consists of:

- 16×2 I2C LCD
- Relay Module
- Servo Motor
- LED
- Buzzer

### 6.4 Cloud and SCADA Layer

The cloud and monitoring layer consists of:

- Wi-Fi communication
- Firebase
- SCADA Web Dashboard

The Firebase layer provides cloud-based data handling between the ESP32 monitoring units and the SCADA dashboard.

---

## 7. Firebase Integration

The ESP32 uses Wi-Fi communication to transmit transformer monitoring data to Firebase.

The transmitted data can include:

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

Firebase acts as the cloud data layer between the ESP32 monitoring system and the SCADA web dashboard.

---

## 8. SCADA Dashboard

The web-based SCADA dashboard provides remote visualization of transformer operating conditions.

The dashboard provides:

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

The dashboard is designed using an industrial monitoring interface to provide clear visualization of transformer conditions and protection status.

---

## 9. Multiple Transformer Monitoring

The system architecture supports multiple transformer monitoring units.

The project includes separate simulation units for:

- TR-001
- TR-002
- TR-003
- TR-004

Each transformer unit can be monitored independently through the SCADA dashboard.

### Transformer Simulation Units

| Transformer | Simulation |
|---|---|
| TR-001 | [Open TR-001 Simulation](YOUR_TR001_LINK) |
| TR-002 | [Open TR-002 Simulation](YOUR_TR002_LINK) |
| TR-003 | [Open TR-003 Simulation](YOUR_TR003_LINK) |
| TR-004 | [Open TR-004 Simulation](YOUR_TR004_LINK) |

The individual transformer simulations represent separate monitoring units connected to the overall SCADA monitoring architecture.

---

## 10. Simulation

The system was developed and tested using an online electronics simulation environment with an ESP32-based monitoring setup.

The simulation demonstrates:

1. ESP32 initialization.
2. Sensor and output device configuration.
3. Wi-Fi connection.
4. Temperature and humidity monitoring.
5. Load percentage simulation.
6. Health score calculation.
7. Risk classification.
8. LCD monitoring.
9. Preventive protection.
10. Cooling control.
11. Alarm generation.
12. Firebase communication.
13. SCADA dashboard visualization.

---

## 11. Simulation Test Conditions

Different operating conditions can be simulated by changing the temperature and load inputs.

### Normal Condition

Low temperature and normal load are applied.

Expected response:

- LOW risk.
- Normal monitoring.
- Relay remains in normal state.
- Cooling remains inactive.
- Alarm remains OFF.

### Warning Condition

Temperature or load is increased.

Expected response:

- Health score decreases.
- Risk level increases.
- Warning indication is generated.
- LCD displays the updated condition.

### Critical Condition

Temperature and/or load conditions are increased to a critical level.

Expected response:

- CRITICAL risk is detected.
- Relay protection is activated.
- Servo cooling is activated.
- LED turns ON.
- Buzzer turns ON.
- Firebase data is updated.
- SCADA dashboard displays critical status.

---

## 12. Preventive Protection Logic

The preventive protection system responds when transformer operating conditions reach a critical state.

```text
Sensor Monitoring
       |
       v
Parameter Processing
       |
       v
Health Score Calculation
       |
       v
Risk Classification
       |
       v
+-------------------+
|    Risk Level     |
+-------------------+
       |
   +---+---+
   |       |
Normal   Critical
   |       |
   v       v
Monitor  Protection
           |
      +----+----+----+
      |         |    |
      v         v    v
    Relay     Cooling Alarm
