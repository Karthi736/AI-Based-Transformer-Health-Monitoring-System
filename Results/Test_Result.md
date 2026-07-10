# Test Results

## AI-Based Predictive Transformer Health Monitoring and Preventive Protection System Using Arduino UNO

The developed system was tested under different transformer operating conditions to verify temperature monitoring, load analysis, health score calculation, risk classification, and protection actions.

---

# Test Condition 1: Normal Condition

### Description

Under normal operating conditions, temperature and load values remain within safe limits.

### System Response

* Health Score remains high.
* Risk level is classified as LOW.
* Cooling system remains OFF.
* No warning alert is generated.

### Output

<img src="./Test_Result_1_Normal.png" width="400">

---

# Test Condition 2: Status Monitoring Condition

### Description

The system monitors transformer parameters and displays real-time health information.

### System Response

* Temperature value is displayed.
* Load condition is monitored.
* Health status is updated on LCD.

### Output

<img src="./Test_Result_2_Status.png" width="400">

---

# Test Condition 3: Prediction Condition

### Description

The system evaluates transformer health and predicts the operating condition.

### System Response

* Health Score is calculated.
* Risk level is identified.
* Failure probability is estimated.

### Output

<img src="./Test_Result_3_Prediction.png" width="400">

---

# Test Condition 4: Critical Condition

### Description

During abnormal temperature or overload conditions, the system enters critical mode.

### System Response

* Critical risk level is detected.
* Cooling mechanism is activated.
* Relay protection is enabled.
* LED and buzzer alerts are generated.

### Output

<img src="./Test_Result_4_Critical.png" width="400">

---

# Test Summary

| Test Condition     | Expected Output      | Result |
| ------------------ | -------------------- | ------ |
| Normal Condition   | LOW Risk             | Passed |
| Status Monitoring  | Real-Time Display    | Passed |
| Prediction Mode    | Health Analysis      | Passed |
| Critical Condition | Protection Activated | Passed |

---

# Conclusion

The test results confirm that the proposed transformer monitoring system successfully detects operating conditions and provides predictive health analysis with automatic preventive protection.
