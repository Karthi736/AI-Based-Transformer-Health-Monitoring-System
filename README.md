# Industrial Transformer Health Monitoring SCADA System

An IoT-enabled industrial transformer monitoring and preventive protection system developed using ESP32, sensor-based condition monitoring, Firebase cloud communication, and a web-based SCADA dashboard.

The system continuously monitors transformer operating parameters, evaluates transformer health, classifies the operating risk, provides preventive protection, and transmits real-time information to a remote SCADA interface.

---

## 1. Project Overview

Transformers are critical components in electrical power systems. Excessive temperature, abnormal loading, and prolonged stressed operation can affect transformer reliability and may eventually lead to equipment failure.

The proposed system provides a low-cost prototype for real-time transformer condition monitoring and preventive protection.

The ESP32 acts as the main monitoring and communication controller. Sensor and simulated load information are processed locally, transformer health parameters are evaluated, and the resulting information is transmitted through Wi-Fi to Firebase.

The SCADA web dashboard retrieves the Firebase data and presents the transformer operating condition through an industrial monitoring interface.

### Overall System Flow

Sensors and Load Simulation  
↓  
ESP32 Monitoring Controller  
↓  
Health Assessment and Risk Classification  
↓  
Preventive Protection and Alarm Control  
↓  
Wi-Fi Communication  
↓  
Firebase Cloud Database  
↓  
Industrial SCADA Web Dashboard

---

## 2. Objectives

The major objectives of the project are:

- Monitor transformer operating parameters in real time.
- Measure transformer temperature and humidity.
- Simulate transformer loading conditions.
- Calculate an overall transformer health score.
- Classify transformer operating conditions into different risk levels.
- Provide early warning during abnormal operating conditions.
- Activate preventive cooling when required.
- Activate relay-based protection during critical conditions.
- Provide visual and audible alarms.
- Maintain fault information for monitoring and maintenance.
- Transmit transformer data to Firebase through Wi-Fi.
- Display real-time transformer information through a SCADA web dashboard.
- Provide a scalable architecture for monitoring multiple transformers.

---

## 3. System Architecture

The system consists of five major layers:

### 3.1 Sensing Layer

The sensing layer collects transformer operating information.

Main inputs include:

- DHT22 temperature sensor
- DHT22 humidity measurement
- Potentiometer-based load simulation

### 3.2 Processing Layer

The ESP32 receives the sensor values and performs:

- Sensor data acquisition
- Parameter processing
- Health assessment
- Risk classification
- Protection decision
- Cooling control
- Alarm control

### 3.3 Protection Layer

The protection section provides automatic response during abnormal conditions.

Main outputs include:

- Relay protection
- Servo-based cooling control
- LED warning indication
- Buzzer alarm

### 3.4 Cloud Communication Layer

The ESP32 communicates with Firebase through Wi-Fi.

Firebase is used as the cloud data layer between the monitoring hardware and the SCADA dashboard.

### 3.5 SCADA Monitoring Layer

The web-based SCADA dashboard provides remote monitoring of transformer operating conditions.

The dashboard can display:

- Transformer temperature
- Humidity
- Load percentage
- Health score
- Risk level
- Relay status
- Cooling status
- Alarm status
- Fault count
- Transformer operating status

---

## 4. Hardware Components

| Component | Purpose |
|---|---|
| ESP32 | Main controller and Wi-Fi communication |
| DHT22 | Temperature and humidity monitoring |
| Potentiometer | Transformer load simulation |
| 16×2 I2C LCD | Local transformer status display |
| Relay Module | Preventive protection / supply isolation |
| Servo Motor | Cooling mechanism simulation |
| LED | Visual warning indication |
| Buzzer | Audible alarm |
| Connecting Wires | Electrical connections |
| Power Supply | System power |

---

## 5. Software and Platforms

The project uses the following software and platforms:

- Arduino IDE
- Embedded C / Arduino C++
- ESP32
- Wokwi Simulator
- Firebase
- HTML
- CSS
- JavaScript
- Web-based SCADA Dashboard
- GitHub

---

## 6. Transformer Monitoring Parameters

The system monitors and processes the following parameters:

| Parameter | Source | Purpose |
|---|---|---|
| Temperature | DHT22 | Transformer thermal condition |
| Humidity | DHT22 | Environmental monitoring |
| Load Percentage | Potentiometer | Transformer loading simulation |
| Health Score | ESP32 | Overall transformer condition |
| Risk Level | ESP32 | Condition classification |
| Relay Status | ESP32 | Protection status |
| Cooling Status | ESP32 / Servo | Cooling condition |
| Alarm Status | ESP32 | Warning indication |
| Fault Count | ESP32 | Critical event tracking |
| Transformer Status | ESP32 / Firebase | Overall operating condition |

---

## 7. Health Assessment

The ESP32 processes the monitored parameters to determine the overall transformer condition.

The health assessment considers transformer operating conditions such as:

- Temperature
- Load percentage
- Abnormal operating conditions

The calculated health score is used to determine the transformer risk level.

---

## 8. Risk Classification

The transformer condition is classified into four operating risk levels.

| Health Score | Risk Level | Operating Condition |
|---|---|---|
| 80–100 | LOW | Normal |
| 50–79 | MEDIUM | Warning |
| 25–49 | HIGH | High Risk |
| Below 25 | CRITICAL | Protection Required |

### LOW

The transformer is operating under normal conditions.

System response:

- Normal monitoring
- Relay remains connected
- Cooling remains in standby
- Alarm remains inactive

### MEDIUM

The transformer is entering a stressed operating condition.

System response:

- Warning indication
- Continuous monitoring
- Health score reduction
- SCADA warning status

### HIGH

The transformer is operating under a high-risk condition.

System response:

- Increased warning indication
- Preventive cooling may be activated
- Continuous condition monitoring
- SCADA high-risk indication

### CRITICAL

The transformer has reached a critical operating condition.

System response:

- Relay protection activated
- Cooling system activated
- LED warning activated
- Buzzer alarm activated
- Fault event recorded
- Firebase status updated
- SCADA dashboard displays critical condition

---

## 9. Preventive Protection

The system is designed to respond before transformer operating conditions become unsafe.

When abnormal temperature or load conditions are detected, the controller evaluates the transformer condition and activates the appropriate preventive response.

### Protection Functions

#### Automatic Cooling

The servo motor represents the transformer cooling mechanism.

Cooling operation can be increased according to the severity of the monitored condition.

#### Relay Protection

During a CRITICAL condition, the relay is activated to represent automatic isolation of the transformer supply.

#### LED Warning

The LED provides a local visual indication of abnormal or critical conditions.

#### Buzzer Alarm

The buzzer provides an audible indication when the transformer enters an abnormal or critical state.

---

## 10. LCD Monitoring

The 16×2 I2C LCD provides local monitoring information.

The LCD can display information such as:

- Temperature
- Humidity
- Load
- Health Score
- Risk Level
- Relay Status
- Cooling Status
- Fault Count
- Transformer Status

The dashboard information can be rotated between multiple display screens so that important parameters can be viewed using a compact LCD interface.

---

## 11. Firebase Cloud Communication

The ESP32 connects to the Internet through Wi-Fi and transmits transformer monitoring information to Firebase.

Firebase acts as the communication layer between the ESP32 monitoring system and the SCADA dashboard.

The cloud database can contain:

- Temperature
- Humidity
- Load percentage
- Health score
- Risk level
- Relay status
- Cooling status
- Alarm status
- Fault count
- Transformer status

This architecture allows transformer information to be monitored remotely.

---

## 12. SCADA Web Dashboard

The Industrial Transformer Health Monitoring SCADA System provides a centralized web-based monitoring interface.

The dashboard is designed using:

- HTML
- CSS
- JavaScript
- Firebase

The SCADA interface provides real-time visualization of transformer operating conditions.

### Dashboard Functions

- Real-time transformer monitoring
- Transformer health indication
- Temperature monitoring
- Humidity monitoring
- Load monitoring
- Health score display
- Risk classification
- Protection status
- Cooling status
- Alarm indication
- Fault count
- Transformer status
- Remote cloud-based monitoring

---

## 13. Multi-Transformer Monitoring

The system architecture supports multiple transformer monitoring units.

The prototype uses separate simulation instances for:

- TR-001
- TR-002
- TR-003
- TR-004

Each transformer simulation represents an individual monitored transformer unit.

The same monitoring concept can be extended to additional transformer units by assigning separate transformer identifiers and corresponding cloud data paths.

### Transformer Identification

| Transformer ID | Monitoring Unit |
|---|---|
| TR-001 | Transformer Monitoring Unit 001 |
| TR-002 | Transformer Monitoring Unit 002 |
| TR-003 | Transformer Monitoring Unit 003 |
| TR-004 | Transformer Monitoring Unit 004 |

---

## 14. Simulation

The transformer monitoring system was tested using ESP32-based online simulation environments.

The simulations demonstrate:

- Sensor data acquisition
- Temperature monitoring
- Humidity monitoring
- Load simulation
- Health assessment
- Risk classification
- Protection control
- Cooling control
- Alarm generation
- Cloud communication concept
- SCADA monitoring architecture

---

## 15. Simulation Test Conditions

### Normal Condition

Normal temperature and load conditions are applied.

Expected result:

- LOW risk level
- Healthy transformer status
- Relay remains connected
- Cooling remains inactive
- Alarm remains inactive

### Warning Condition

Temperature or load is gradually increased.

Expected result:

- Health score decreases
- Risk level increases
- Warning indication appears
- SCADA dashboard updates the transformer status

### High-Risk Condition

The operating parameters are increased further.

Expected result:

- HIGH risk classification
- Preventive monitoring activated
- Cooling response may be activated
- SCADA dashboard indicates high-risk condition

### Critical Condition

The monitored parameters reach a critical operating condition.

Expected result:

- CRITICAL risk classification
- Relay protection activated
- Cooling activated
- LED warning activated
- Buzzer activated
- Fault count updated
- Firebase data updated
- SCADA dashboard displays CRITICAL status

---

## 16. Project Documentation

The project documentation contains the following major diagrams and files:

### Block Diagram

Shows the overall functional relationship between:

Sensors → ESP32 → Processing → Protection → Firebase → SCADA Dashboard

### Flowchart

Shows the complete operating logic of the transformer monitoring and protection system.

### Circuit Diagram

Shows the electrical connections between the ESP32, DHT22, potentiometer, LCD, relay, servo motor, LED, and buzzer.

### System Architecture

Shows the complete hardware-to-cloud-to-SCADA communication architecture.

### Simulation Details

Contains the simulation platform, components, operating logic, test conditions, Firebase communication concept, and SCADA monitoring workflow.

---

## 17. Repository Structure

```text
AI-Based-Transformer-Health-Monitoring-System/
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
│   ├── dashboard screenshots
│   ├── project images
│   └── simulation images
│
├── Simulation/
│   ├── TR-001
│   ├── TR-002
│   ├── TR-003
│   └── TR-004
│
├── simulator/
│   └── firebase configuration and simulator files
│
├── README.md
└── LICENSE
