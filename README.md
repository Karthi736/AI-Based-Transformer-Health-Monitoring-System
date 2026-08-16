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

The complete system follows the architecture:

**DHT22 + Load Input → ESP32 → Health Assessment → Risk Classification → Preventive Protection → Firebase → SCADA Dashboard**

![System Architecture](./Images/System_Architecture.png)

---

## Block Diagram

![Block Diagram](./Images/Block_Diagram.png)

---

## Flowchart

![Flowchart](./Images/Flowchart.png)

---

## Circuit Diagram

![Circuit Diagram](./Images/Circuit_Diagram.png)

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
- HTML
- CSS
- JavaScript
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

## Preventive Protection

During a critical transformer condition, the system performs automatic preventive actions:

- Relay protection is activated
- Servo-based cooling is activated
- LED warning is turned ON
- Buzzer alarm is activated
- Transformer status is updated on the LCD
- Monitoring data is updated in Firebase
- SCADA dashboard displays the critical condition

---

## Firebase and SCADA Communication

The ESP32 communicates through Wi-Fi and sends transformer monitoring data to Firebase.

The SCADA web dashboard retrieves the available monitoring information from Firebase and provides remote visualization of transformer operating conditions.

The monitored parameters include:

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

---

## Multi-Transformer Simulation

Four transformer monitoring units are simulated separately.

### TR-001

[Open TR-001 Simulation](https://wokwi.com/projects/472072364712871937)

### TR-002

[Open TR-002 Simulation](https://wokwi.com/projects/471997864432481281)

### TR-003

[Open TR-003 Simulation](https://wokwi.com/projects/471997923499829249)

### TR-004

[Open TR-004 Simulation](https://wokwi.com/projects/471997982880700417)

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
