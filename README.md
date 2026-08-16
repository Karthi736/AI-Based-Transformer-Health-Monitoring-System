# System Documentation

The following documentation provides the complete design, hardware implementation, monitoring workflow, and simulation details of the Industrial Transformer Health Monitoring SCADA System.

---

## System Architecture

The system architecture illustrates the overall communication and functional relationship between the transformer monitoring units, ESP32 controller, Firebase cloud database, and SCADA web dashboard.

<p align="center">
  <img src="./Documentation/System_Architecture.png" alt="System Architecture" width="850">
</p>

---

## Block Diagram

The block diagram represents the major functional modules of the Industrial Transformer Health Monitoring SCADA System, including sensing, ESP32 processing, health assessment, risk analysis, protection, cloud communication, and SCADA monitoring.

<p align="center">
  <img src="./Documentation/Block_Diagram.png" alt="Block Diagram" width="850">
</p>

---

## Circuit Diagram

The circuit diagram shows the hardware-level connections between the ESP32, DHT22 sensors, potentiometer, 16×2 I2C LCD, relay module, servo motor, LED, and buzzer.

<p align="center">
  <img src="./Documentation/Circuit_Diagram.png" alt="Circuit Diagram" width="850">
</p>

---

## Flowchart

The flowchart represents the complete monitoring and preventive protection sequence, starting from ESP32 initialization and sensor acquisition through health assessment, risk classification, protection actions, Firebase communication, and SCADA dashboard monitoring.

<p align="center">
  <img src="./Documentation/FlowChart.png" alt="System Flowchart" width="850">
</p>

---

## Simulation Details

Detailed information regarding the simulation platform, hardware configuration, operating conditions, risk classification, protection response, Firebase communication, and SCADA monitoring is provided in the Simulation Details document.

[View Simulation Details](./Documentation/Simulation_Details.md)

---

# Transformer Simulations

The system includes four individual transformer simulation units representing TR-001, TR-002, TR-003, and TR-004.

| Transformer | Simulation |
|------------|------------|
| TR-001 | [Open Wokwi Simulation](https://wokwi.com/projects/472072364712871937) |
| TR-002 | [Open Wokwi Simulation](https://wokwi.com/projects/471997864432481281) |
| TR-003 | [Open Wokwi Simulation](https://wokwi.com/projects/471997923499829249) |
| TR-004 | [Open Wokwi Simulation](https://wokwi.com/projects/471997982880700417) |

Each simulation represents an individual transformer monitoring unit and demonstrates the monitoring, health assessment, risk classification, and preventive protection functions of the system.

---

# Documentation Files

| Document | Description |
|----------|-------------|
| [System Architecture](./Documentation/System_Architecture.png) | Overall system architecture |
| [Block Diagram](./Documentation/Block_Diagram.png) | Functional block representation |
| [Circuit Diagram](./Documentation/Circuit_Diagram.png) | Hardware connection diagram |
| [Flowchart](./Documentation/FlowChart.png) | System monitoring and protection workflow |
| [Simulation Details](./Documentation/Simulation_Details.md) | Complete simulation documentation |

---

# Author

**Karthikeyan M**

B.E. Electrical and Electronics Engineering  
V.S.B College of Engineering Technical Campus  
Anna University  
Academic Year: 2023–2027

---

# Project Title

**Industrial Transformer Health Monitoring SCADA System**
