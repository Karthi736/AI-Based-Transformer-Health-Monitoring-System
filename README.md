# Industrial Transformer Health Monitoring SCADA System

An ESP32-based transformer health monitoring and preventive protection system with Firebase cloud communication and an industrial SCADA web dashboard.

The system monitors transformer temperature, humidity, and load conditions, calculates a health score, classifies the risk level, and activates preventive protection during critical conditions.

---

## Key Features

- Real-time transformer condition monitoring
- Temperature and humidity monitoring
- Load percentage monitoring
- Transformer health score
- LOW, MEDIUM, HIGH, and CRITICAL risk classification
- Automatic relay-based protection
- Servo-based cooling control
- LED and buzzer alarm indication
- 16×2 I2C LCD monitoring
- Firebase cloud communication
- Industrial SCADA web dashboard
- Multi-transformer monitoring

---

## System Architecture

**DHT22 + Load Input → ESP32 → Health Assessment → Risk Classification → Protection Control → Firebase → SCADA Dashboard**

![System Architecture](Images/System_Architecture.png)

---

## Hardware

- ESP32
- DHT22
- Potentiometer
- 16×2 I2C LCD
- Relay Module
- Servo Motor
- LED
- Buzzer

---

## Technologies

- Arduino IDE
- ESP32
- Wi-Fi
- Firebase
- HTML
- CSS
- JavaScript
- SCADA Web Dashboard
- Wokwi

---

## Risk Classification

| Health Score | Risk Level | Response |
|---|---|---|
| 80–100 | LOW | Normal Monitoring |
| 50–79 | MEDIUM | Warning |
| 25–49 | HIGH | Preventive Action |
| Below 25 | CRITICAL | Protection Activated |

---

## Protection Response

During a critical condition, the system:

- Activates relay protection
- Activates servo cooling
- Turns ON LED warning
- Activates buzzer alarm
- Updates the LCD status
- Updates Firebase data
- Displays the critical condition on the SCADA dashboard

---

## Multi-Transformer Simulation

The system is simulated for four transformer monitoring units.

| Transformer | Wokwi Simulation |
|---|---|
| TR-001 | [Open Simulation](https://wokwi.com/projects/472072364712871937) |
| TR-002 | [Open Simulation](https://wokwi.com/projects/471997864432481281) |
| TR-003 | [Open Simulation](https://wokwi.com/projects/471997923499829249) |
| TR-004 | [Open Simulation](https://wokwi.com/projects/471997982880700417) |

---

## Documentation

### Block Diagram

![Block Diagram](Images/Block_Diagram.png)

### Flowchart

![Flowchart](Images/Flowchart.png)

### Circuit Diagram

![Circuit Diagram](Images/Circuit_Diagram.png)

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
---
Future Scope
Transformer oil temperature and level monitoring
Current and voltage monitoring
Vibration monitoring
Historical data analysis
Advanced predictive maintenance
Machine learning-based fault prediction
Large-scale multi-transformer SCADA integration
Author
---
Karthikeyan M

B.E. Electrical and Electronics Engineering
V.S.B College of Engineering Technical Campus
2023–2027
