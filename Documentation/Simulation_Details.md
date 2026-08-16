# Simulation Details

## 1. Overview

The Industrial Transformer Health Monitoring SCADA System was simulated using an ESP32-based monitoring setup.

The simulation demonstrates real-time transformer condition monitoring, health assessment, risk classification, alarm generation, cooling control, relay-based protection, and remote data transmission to Firebase for SCADA dashboard visualization.

---

## 2. Simulation Platform

The system was developed and tested using an online electronics simulation environment.

### Main Controller

- ESP32

### Sensors / Inputs

- DHT22 – Temperature and Humidity Monitoring
- Potentiometer – Load Percentage Simulation

### Display

- 16×2 I2C LCD

### Protection and Control

- Relay Module
- Servo Motor – Cooling Control
- LED – Visual Warning
- Buzzer – Audible Alarm

### Cloud Communication

- Wi-Fi
- Firebase

### Monitoring Interface

- SCADA Web Dashboard

---

## 3. Simulated Parameters

The simulation uses the following parameters to represent transformer operating conditions:

| Parameter | Simulation Input | Purpose |
|---|---|---|
| Temperature | DHT22 | Monitors transformer temperature |
| Humidity | DHT22 | Monitors humidity as an additional transformer condition parameter |
| Load | Potentiometer | Simulates transformer load percentage |
| Health Score | ESP32 | Determines the overall transformer condition |
| Risk Level | ESP32 | Classifies the transformer condition |
| Relay Status | ESP32 | Provides preventive protection |
| Cooling Status | Servo | Represents automatic cooling action |
| Alarm Status | LED + Buzzer | Indicates abnormal or critical conditions |

---

## 4. Simulation Operation

The simulation follows the sequence below:

1. ESP32 is initialized.
2. Sensors and output devices are configured.
3. ESP32 connects to Wi-Fi.
4. Temperature, humidity, and load values are read continuously.
5. The measured parameters are processed by the ESP32.
6. A transformer health score is calculated.
7. The corresponding risk level is determined.
8. The operating status is displayed on the 16×2 I2C LCD.
9. Under normal conditions, the transformer remains in normal operating mode.
10. When the risk level increases, warning and preventive protection actions are activated.
11. Under critical conditions:
    - Relay protection is activated.
    - Servo cooling is activated.
    - LED warning is activated.
    - Buzzer alarm is activated.
12. The monitoring data is transmitted through Wi-Fi to Firebase.
13. The SCADA web dashboard retrieves and displays the transformer monitoring data.
14. The monitoring process continues continuously.

---

## 5. Risk Classification

The system classifies transformer health using the calculated health score.

| Health Score | Risk Level | System Response |
|---|---|---|
| 80 – 100 | LOW | Normal Monitoring |
| 50 – 79 | MEDIUM | Warning Monitoring |
| 25 – 49 | HIGH | Warning / Preventive Action |
| Below 25 | CRITICAL | Protection Activated |

---

## 6. Preventive Protection Simulation

When a critical transformer condition is detected, the ESP32 activates the preventive protection system.

### Critical Condition Response

- Relay protection is activated.
- Servo motor operates as a cooling mechanism.
- LED turns ON.
- Buzzer produces an alarm.
- Transformer status is updated on the LCD.
- Critical status is transmitted to Firebase.
- SCADA dashboard displays the updated protection status.

This demonstrates how abnormal transformer operating conditions can be detected and addressed automatically.

---

## 7. Firebase Communication

The ESP32 uses Wi-Fi communication to transmit monitoring data to Firebase.

The cloud data can include:

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

Firebase acts as the cloud data layer between the ESP32 monitoring system and the SCADA web dashboard.

---

## 8. SCADA Dashboard Monitoring

The SCADA web dashboard receives the Firebase data and displays the transformer condition remotely.

The dashboard provides:

- Real-time Temperature
- Humidity
- Load Percentage
- Health Score
- Risk Level
- Relay Status
- Cooling Status
- Alarm Status
- Fault Count
- Transformer Status

This allows the transformer condition to be monitored remotely through a web-based SCADA interface.

---

## 9. Simulation Test Conditions

Different operating conditions can be simulated by changing the temperature and load inputs.

### Normal Condition

Low temperature and normal load are applied.

**Expected Result:**

- Low risk
- Normal monitoring
- Relay remains in normal state
- Cooling remains inactive
- Alarm remains OFF

### Warning Condition

Temperature or load is increased.

**Expected Result:**

- Risk level increases
- Health score decreases
- Warning indication is generated
- LCD displays the updated condition

### Critical Condition

Temperature and/or load conditions are increased to a critical level.

**Expected Result:**

- Critical risk is detected
- Relay protection is activated
- Servo cooling is activated
- LED turns ON
- Buzzer turns ON
- Firebase data is updated
- SCADA dashboard shows critical status

---

## 10. Simulation Result

The simulation successfully demonstrates the complete monitoring and preventive protection workflow.

The ESP32 collects transformer operating parameters, evaluates transformer health, determines the risk level, activates preventive protection during critical conditions, and transmits the monitoring information to Firebase.

The SCADA dashboard provides remote visualization of the transformer operating condition, protection status, and associated monitoring parameters.

The simulation therefore validates the basic integration of sensing, edge processing, preventive protection, cloud communication, and SCADA visualization.

---

## 11. Conclusion

The simulation validates the basic working concept of the **Industrial Transformer Health Monitoring SCADA System**.

It demonstrates the integration of:

**Sensors → ESP32 → Health Assessment → Risk Analysis → Protection → Firebase → SCADA Dashboard**

The system provides a practical approach for monitoring transformer operating conditions and responding to abnormal conditions through preventive protection mechanisms.

The system can be further extended with additional transformer parameters, historical data analysis, improved predictive analytics, and advanced maintenance-support algorithms.
