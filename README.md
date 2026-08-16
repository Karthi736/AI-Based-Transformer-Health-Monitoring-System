# Industrial Transformer Health Monitoring SCADA System

An ESP32-based transformer health monitoring and preventive protection system with Firebase cloud communication and an industrial SCADA web dashboard.

The system monitors transformer temperature, humidity, and load conditions, calculates a transformer health score, classifies the transformer risk level, and activates preventive protection during critical conditions.

---

## Key Features

- Real-time transformer condition monitoring
- Temperature and humidity monitoring
- Load percentage monitoring
- Transformer health score calculation
- LOW, MEDIUM, HIGH, and CRITICAL risk classification
- Automatic relay-based protection
- Servo-based cooling control
- LED warning indication
- Buzzer alarm indication
- 16×2 I2C LCD monitoring
- Wi-Fi communication
- Firebase cloud communication
- Industrial SCADA web dashboard
- Multi-transformer monitoring
- Remote transformer status visualization
  
---

## System Architecture

The complete system architecture is shown below.

<img src="../Images/System_Architecture.png" alt="System Architecture" width="100%">

---

## Block Diagram

The functional block diagram of the Industrial Transformer Health Monitoring SCADA System is shown below.

<img src="../Images/Block_Diagram.png" alt="Block Diagram" width="100%">

---

## Flowchart

The system operation and monitoring workflow are represented in the following flowchart.

<img src="../Images/Flowchart.png" alt="System Flowchart" width="100%">

---

## Circuit Diagram

The ESP32-based hardware circuit and component connections are shown below.

<img src="../Images/Circuit_Diagram.png" alt="Circuit Diagram" width="100%">

---

## Hardware Components

- ESP32
- DHT22 Temperature and Humidity Sensor
- Potentiometer for Load Simulation
- 16×2 I2C LCD
- Relay Module
- Servo Motor
- LED
- Buzzer

---

## Hardware Functions

| Component | Function |
|---|---|
| ESP32 | Main controller and data processing unit |
| DHT22 | Temperature and humidity monitoring |
| Potentiometer | Transformer load percentage simulation |
| 16×2 I2C LCD | Local transformer status display |
| Relay Module | Preventive protection control |
| Servo Motor | Automatic cooling control |
| LED | Visual warning indication |
| Buzzer | Audible alarm indication |

---

## Technologies Used

- ESP32
- Arduino IDE
- Wi-Fi
- Firebase
- HTML, CSS, JavaScript
- SCADA Web Dashboard
- Wokwi Simulation

---

## Risk Classification

| Health Score | Risk Level | System Response |
|---|---|---|
| 80–100 | LOW | Normal Monitoring |
| 50–79 | MEDIUM | Warning Monitoring |
| 25–49 | HIGH | Preventive Action |
| Below 25 | CRITICAL | Protection Activated |

---

## Multi-Transformer Simulation

- **TR-001:** [View Simulation](https://wokwi.com/projects/472072364712871937)
- **TR-002:** [View Simulation](https://wokwi.com/projects/471997864432481281)
- **TR-003:** [View Simulation](https://wokwi.com/projects/471997923499829249)
- **TR-004:** [View Simulation](https://wokwi.com/projects/471997982880700417)

---

## Project Structure

```text
AI-Based-Transformer-Health-Monitoring-System/
│
├── Arduino_Code/
│   └── Smart_Transformer_Health_Monitoring.ino
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
│   ├── Block_Diagram.png
│   ├── Circuit_Diagram.png
│   ├── Flowchart.png
│   └── System_Architecture.png
│
├── Simulation/
│   ├── TR-001
│   ├── TR-002
│   ├── TR-003
│   └── TR-004
│
├── simulator/
│   └── firebase-config.js
│
├── README.md
└── LICENSE
--
