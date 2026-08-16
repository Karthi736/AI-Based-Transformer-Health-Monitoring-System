# Industrial Transformer Health Monitoring SCADA System

## 1. Project Overview

The Industrial Transformer Health Monitoring SCADA System is an ESP32-based monitoring and preventive protection system designed to continuously monitor transformer operating conditions.

The system collects temperature, humidity, and load-related parameters, processes the sensor data using the ESP32, calculates an overall transformer health score, determines the corresponding risk level, and activates preventive protection during critical operating conditions.

The monitoring data is transmitted through Wi-Fi to Firebase and displayed on a web-based SCADA dashboard for remote monitoring.

The system is designed around the following monitoring and protection workflow:

Sensors → ESP32 → Health Assessment → Risk Analysis → Protection → Firebase → SCADA Dashboard

---

## 2. Objectives

The main objectives of the project are:

- To monitor transformer operating parameters in real time.
- To monitor transformer temperature and humidity.
- To simulate transformer load conditions.
- To calculate a transformer health score.
- To classify transformer operating conditions into different risk levels.
- To provide automatic preventive protection during critical conditions.
- To control cooling automatically using a servo motor.
- To provide visual and audible alarms.
- To display local transformer information using an I2C LCD.
- To transmit monitoring data to Firebase using Wi-Fi.
- To provide remote transformer monitoring through a SCADA web dashboard.
- To support monitoring of multiple simulated transformers.

---

## 3. System Architecture

The system consists of three major layers.

### Field Monitoring Layer

The field layer consists of:

- Transformer units
- DHT22 temperature and humidity sensor
- Potentiometer for load simulation

The sensors provide the operating parameters required for transformer condition assessment.

### Data Processing and Protection Layer

The ESP32 acts as the main controller.

It performs:

- Sensor data acquisition
- Data processing
- Health score calculation
- Risk level classification
- Protection decision
- Relay control
- Servo cooling control
- LED indication
- Buzzer alarm
- LCD display update
- Wi-Fi communication

### Remote Monitoring Layer

The remote monitoring layer consists of:

- Wi-Fi communication
- Firebase cloud database
- SCADA web dashboard

Firebase acts as the cloud data layer between the ESP32 monitoring system and the SCADA dashboard.

---

## 4. Hardware Components

| Component | Function |
|---|---|
| ESP32 | Main controller and Wi-Fi communication |
| DHT22 | Temperature and humidity monitoring |
| Potentiometer | Transformer load simulation |
| 16×2 I2C LCD | Local parameter and status display |
| Relay Module | Preventive protection / isolation |
| Servo Motor | Automatic cooling representation |
| LED | Visual warning indication |
| Buzzer | Audible alarm indication |
| Transformer Units | Simulated transformer monitoring targets |

---

## 5. Monitoring Parameters

The system monitors the following parameters:

| Parameter | Source | Purpose |
|---|---|---|
| Temperature | DHT22 | Transformer thermal condition |
| Humidity | DHT22 | Environmental / insulation condition |
| Load Percentage | Potentiometer | Transformer loading condition |
| Health Score | ESP32 | Overall transformer condition |
| Risk Level | ESP32 | Operating condition classification |
| Relay Status | ESP32 | Protection status |
| Cooling Status | Servo | Cooling operation |
| Alarm Status | LED + Buzzer | Abnormal condition indication |
| Fault Count | ESP32 | Critical fault tracking |
| Transformer Status | ESP32 / Firebase | Overall operating state |

---

## 6. Health Assessment

The ESP32 processes the monitored parameters and calculates a transformer health score.

The health score represents the overall operating condition of the transformer.

A higher health score represents a healthier operating condition, while a lower score represents increasing transformer risk.

The health assessment is used as the basis for risk classification and preventive protection.

---

## 7. Risk Classification

The transformer condition is classified based on the calculated health score.

| Health Score | Risk Level | System Response |
|---|---|---|
| 80 – 100 | LOW | Normal Monitoring |
| 50 – 79 | MEDIUM | Warning Monitoring |
| 25 – 49 | HIGH | Preventive Warning |
| Below 25 | CRITICAL | Protection Activated |

### LOW

The transformer is operating under a normal condition.

- Normal monitoring continues.
- Relay remains in normal operating state.
- Cooling remains inactive.
- Alarm remains OFF.

### MEDIUM

The transformer condition requires attention.

- Health score decreases.
- Warning status is displayed.
- Parameters continue to be monitored.

### HIGH

The transformer is approaching an unsafe operating condition.

- Warning indication is generated.
- Transformer condition is displayed on the LCD.
- Monitoring continues with increased attention.

### CRITICAL

A critical transformer condition is detected.

- Protection is activated.
- Relay operation is initiated.
- Servo cooling is activated.
- LED turns ON.
- Buzzer turns ON.
- Critical status is transmitted to Firebase.
- SCADA dashboard displays the critical condition.

---

## 8. Preventive Protection

The system provides automatic preventive protection when a critical condition is detected.

The protection mechanism includes:

1. Critical condition detection.
2. Relay protection activation.
3. Servo motor cooling activation.
4. LED warning activation.
5. Buzzer alarm activation.
6. LCD status update.
7. Firebase data update.
8. SCADA dashboard status update.

This provides an automated response to abnormal transformer operating conditions.

---

## 9. Local LCD Monitoring

The 16×2 I2C LCD provides local monitoring information.

The display can show important transformer parameters such as:

- Temperature
- Load percentage
- Health condition
- Risk status
- Protection status

The LCD provides a local indication even when the system is being monitored remotely through the SCADA dashboard.

---

## 10. Firebase Cloud Communication

The ESP32 connects to the network through Wi-Fi and transmits transformer monitoring data to Firebase.

The Firebase data layer can contain:

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

Firebase provides the communication layer between the field monitoring system and the SCADA web dashboard.

---

## 11. SCADA Web Dashboard

The SCADA web dashboard provides remote monitoring of transformer operating conditions.

The dashboard displays:

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

The dashboard is designed to provide an industrial-style monitoring interface for observing transformer conditions remotely.

---

## 12. Multiple Transformer Monitoring

The system supports separate simulation instances for multiple transformer units.

The simulated transformer units are:

- TR-001
- TR-002
- TR-003
- TR-004

Each simulation represents an individual transformer monitoring instance.

The separate simulations can be used to demonstrate different transformer operating conditions and risk states.

---

## 13. Simulation References

### TR-001

Transformer simulation instance: TR-001

### TR-002

Transformer simulation instance: TR-002

### TR-003

Transformer simulation instance: TR-003

### TR-004

Transformer simulation instance: TR-004

The complete simulation references are maintained separately for each transformer unit.

---

## 14. Simulation and Testing

The system was tested using an ESP32-based online simulation environment.

Different operating conditions can be created by changing the temperature and load inputs.

### Test Case 1 – Normal Condition

Low temperature and normal load conditions are applied.

Expected response:

- Health score remains high.
- Risk level remains LOW.
- Relay remains in normal state.
- Cooling remains inactive.
- LED remains OFF.
- Buzzer remains OFF.
- Firebase receives normal operating data.
- SCADA dashboard displays normal transformer status.

### Test Case 2 – Warning Condition

Temperature or load is gradually increased.

Expected response:

- Health score decreases.
- Risk level changes to MEDIUM or HIGH.
- Warning condition is displayed.
- LCD displays updated parameters.
- Firebase receives updated monitoring data.
- SCADA dashboard reflects the changed condition.

### Test Case 3 – Critical Condition

Temperature and/or load is increased to a critical operating condition.

Expected response:

- Health score falls below the critical threshold.
- Risk level becomes CRITICAL.
- Relay protection is activated.
- Servo cooling is activated.
- LED turns ON.
- Buzzer turns ON.
- LCD displays the critical condition.
- Firebase data is updated.
- SCADA dashboard displays the protection status.

---

## 15. Documentation References

The following project documentation files are included in the Documentation section.

### Block Diagram

`Block_Diagram.png`

The block diagram represents the overall functional relationship between the transformer, sensors, ESP32, processing logic, protection devices, Firebase, and SCADA dashboard.

### Flowchart

`FlowChart.png`

The flowchart represents the software execution sequence, including sensor acquisition, health assessment, risk classification, protection control, Firebase communication, and continuous monitoring.

### Circuit Diagram

`Circuit_Diagram.png`

The circuit diagram represents the electrical connections between the ESP32, DHT22, potentiometer, LCD, relay, servo motor, LED, and buzzer.

### System Architecture

`System_Architecture.png`

The system architecture illustrates the complete field-device, processing, cloud, and SCADA monitoring structure.

### Simulation Details

`Simulation_Details.md`

The simulation details document describes the simulation platform, hardware components, operating conditions, risk classification, protection response, Firebase communication, and SCADA monitoring.

---

## 16. Project Workflow

The complete system operates according to the following workflow:

1. Transformer parameters are sensed.
2. DHT22 measures temperature and humidity.
3. Potentiometer provides load simulation.
4. ESP32 receives the sensor values.
5. The values are processed.
6. Transformer health score is calculated.
7. Risk level is determined.
8. Local LCD status is updated.
9. Protection logic checks the risk condition.
10. Normal conditions continue monitoring.
11. Warning conditions generate warning indications.
12. Critical conditions activate preventive protection.
13. Relay protection is activated.
14. Servo cooling is activated.
15. LED and buzzer provide alarm indication.
16. Transformer data is transmitted to Firebase.
17. SCADA dashboard retrieves the cloud data.
18. Transformer status is displayed remotely.
19. The system continues monitoring.

---

## 17. Key Features

- Real-time transformer monitoring
- Temperature monitoring
- Humidity monitoring
- Load monitoring
- Transformer health score
- Risk level classification
- Preventive protection
- Relay-based protection
- Automatic cooling control
- LED warning indication
- Buzzer alarm
- Local LCD monitoring
- Wi-Fi connectivity
- Firebase cloud integration
- SCADA web dashboard
- Fault monitoring
- Multiple transformer simulation support

---

## 18. Project Documentation Structure

The repository documentation is organized as follows:

Documentation/

- Block_Diagram.png
- Circuit_Diagram.png
- FlowChart.png
- System_Architecture.png
- Simulation_Details.md

The simulation files are maintained separately under the Simulation section.

---

## 19. Future Enhancements

The system can be further enhanced by implementing:

- Additional transformer condition parameters
- Oil temperature monitoring
- Oil level monitoring
- Transformer vibration monitoring
- Current and voltage measurement
- Power factor monitoring
- Energy consumption monitoring
- Historical trend analysis
- Advanced predictive maintenance algorithms
- Machine-learning-based fault prediction
- Mobile monitoring application
- Industrial communication protocols
- Multi-transformer centralized SCADA monitoring
- Long-term cloud data analytics

---

## 20. Conclusion

The Industrial Transformer Health Monitoring SCADA System demonstrates the integration of embedded monitoring, intelligent health assessment, preventive protection, cloud communication, and remote SCADA visualization.

The ESP32 collects transformer operating parameters and processes the data to determine transformer health and risk level. Based on the detected condition, the system can activate preventive protection through relay control, automatic cooling, LED indication, and buzzer alarm.

The monitored information is transmitted through Wi-Fi to Firebase and made available to the SCADA web dashboard for remote monitoring.

The project provides a practical prototype for transformer condition monitoring and preventive protection and demonstrates how embedded systems, cloud platforms, and SCADA interfaces can be integrated into an industrial monitoring architecture.

---

## Author

**Karthikeyan M**  
B.E. Electrical and Electronics Engineering  
Industrial Transformer Health Monitoring SCADA System
