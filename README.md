# AI-Based Predictive Transformer Health Monitoring and Preventive Protection System Using Arduino UNO

## Overview

Transformer failure can cause power interruption and maintenance problems. This project proposes an AI-based predictive transformer health monitoring system using Arduino UNO.

The system continuously monitors transformer temperature and load condition. Based on the collected parameters, Arduino calculates a Health Score and predicts the transformer risk level.

The system provides automatic cooling control, relay-based protection, and alert indication using LED and buzzer.

---

## Objectives

* Monitor transformer temperature continuously
* Simulate transformer load condition
* Calculate transformer Health Score
* Predict failure probability
* Estimate remaining transformer life
* Provide automatic cooling control
* Protect transformer during critical conditions

---

## Hardware Components

| Component                | Purpose                |
| ------------------------ | ---------------------- |
| Arduino UNO              | Main controller        |
| DHT22 Temperature Sensor | Temperature monitoring |
| Potentiometer            | Load simulation        |
| 16x2 I2C LCD             | Status display         |
| Servo Motor              | Cooling simulation     |
| Relay Module             | Protection control     |
| LED                      | Warning indication     |
| Buzzer                   | Alarm indication       |

---

## System Features

* Real-time temperature monitoring
* Load condition monitoring
* AI-based Health Score calculation
* Risk level classification
* Failure probability estimation
* Remaining life prediction
* Automatic cooling activation
* Relay protection system
* Fault counting
* LCD dashboard display

---

## Working Principle

1. DHT22 sensor measures transformer temperature.
2. Potentiometer simulates transformer load condition.
3. Arduino UNO processes sensor values.
4. Health Score is calculated based on temperature and load.
5. System classifies transformer condition into different risk levels.
6. Cooling and protection actions are automatically controlled.

---

## Health Score Classification

| Health Score | Risk Level    |
| ------------ | ------------- |
| 80 - 100     | LOW Risk      |
| 50 - 79      | MEDIUM Risk   |
| 25 - 49      | HIGH Risk     |
| Below 25     | CRITICAL Risk |

---

## Protection Actions

### LOW Risk

* Normal operation
* Cooling OFF

### MEDIUM Risk

* Monitoring increased
* Cooling assistance activated

### HIGH Risk

* Cooling ON
* Warning indication

### CRITICAL Risk

* Relay protection activated
* Buzzer alert
* Fault condition detected

---

## Simulation

The project is simulated using Wokwi platform.

Simulation Link:

https://wokwi.com/projects/469066635947975681

---

## Project Images

### Block Diagram

![Block Diagram](Images/Block_Diagram.png)

### Circuit Diagram

![Circuit Diagram](Images/Circuit_Diagram.png)

### Flowchart

![Flowchart](Images/Flowchart.png)

---

## LCD Monitoring Screens

### Normal Condition

![Normal](Images/LCD_Normal.png)

### Status Display

![Status](Images/LCD_Status.png)

### Prediction Output

![Prediction](Images/LCD_Prediction.png)

### Critical Condition

![Critical](Images/LCD_Critical.png)

---

## Arduino Code

Main program:

```
Arduino_Code/AI_Transformer_Health_Monitoring.ino
```

---

## Future Improvements

* Machine Learning based prediction model
* IoT cloud monitoring
* Mobile application integration
* Real transformer data analysis
* Advanced fault detection techniques

---

## Conclusion

This project demonstrates an intelligent transformer monitoring system capable of predicting transformer health condition and providing preventive protection using Arduino UNO.
