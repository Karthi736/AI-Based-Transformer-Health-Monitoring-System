/*
===============================================================================
 Project Title : AI-Based Predictive Transformer Health Monitoring and
                 Preventive Protection System Using Arduino UNO

 Developed By  : KARTHIKEYAN M
 Register No   : 723723105010

 Department    : Electrical and Electronics Engineering
 Institution   : V.S.B College of Engineering Technical Campus
 University    : Anna University, Chennai

 Description   :
 This project continuously monitors transformer temperature and load,
 calculates a predictive health score, estimates failure probability,
 predicts remaining life, controls automatic cooling using a servo motor,
 and protects the transformer using a relay module. The system also
 provides visual and audible alerts and displays all operating parameters
 on a 16x2 I2C LCD dashboard.

 Hardware Used :
 - Arduino UNO
 - DHT22 Temperature Sensor
 - Potentiometer (Load Simulation)
 - 16x2 I2C LCD
 - Servo Motor
 - Relay Module
 - LED
 - Buzzer

 Software Used :
 - Arduino IDE
 - Wokwi Online Simulator

 Simulation :
 https://wokwi.com/projects/469066635947975681

 GitHub Repository :
 https://github.com/Karthi736/AI-Based-Transformer-Health-Monitoring-System

 Academic Year : 2025-2026
===============================================================================
*/
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <Servo.h>

// --- Pin Definitions ---
#define DHTPIN 2
#define DHTTYPE DHT22
#define LED_PIN 8
#define BUZZER_PIN 9
#define SERVO_PIN 10
#define RELAY_PIN 11
#define POT_PIN A0

// --- Constants & Thresholds ---
const unsigned long SCREEN_INTERVAL = 3000; // 3 seconds per LCD dashboard screen
const unsigned long SENSOR_INTERVAL = 1000; // Read sensors every 1 second

// --- Global Objects ---
LiquidCrystal_I2C lcd(0x27, 16, 2); 
DHT dht(DHTPIN, DHTTYPE);
Servo coolingServo;

// --- System State Variables ---
float temperature = 0.0;
float currentLoad = 0.0;
int healthScore = 100;
String riskLevel = "LOW";
float remainingLifeYears = 15.0;
int failureProbability = 0;
int faultCount = 0;
bool relayState = true;          // true = ON (Healthy), false = OFF (Tripped/Critical)
bool wasCriticalLastCheck = false; // Flag to prevent continuous increment of fault counter

// --- Timing Variables ---
unsigned long lastScreenUpdate = 0;
unsigned long lastSensorRead = 0;
int currentScreen = 0;

// --- Function Prototypes ---
void startupAnimation();
void readSensors();
void calculateHealth();
void predictRisk();
void estimateRemainingLife();
void calculateFailureProbability();
void controlCooling();
void controlProtection();
void displayDashboard();

void setup() {
  // Initialize Serial Communication for debugging
  Serial.begin(9600);

  // Initialize Peripherals & Pins
  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  
  // Set initial safe states (Active Low or High depending on module, standard active low assumed for industrial relays)
  digitalWrite(RELAY_PIN, HIGH); // Relay ON initially (Energized / Connected)
  digitalWrite(LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  coolingServo.attach(SERVO_PIN);
  coolingServo.write(0); // Fan/Valve shut off position

  dht.begin();
  
  lcd.init();
  lcd.backlight();

  // Execute Mandatory Startup Sequence
  startupAnimation();
}

void loop() {
  unsigned long currentMillis = millis();

  // Periodic Sensor Evaluation and AI Modeling Execution
  if (currentMillis - lastSensorRead >= SENSOR_INTERVAL) {
    lastSensorRead = currentMillis;

    readSensors();
    calculateHealth();
    predictRisk();
    estimateRemainingLife();
    calculateFailureProbability();
    controlCooling();
    controlProtection();
  }

  // Periodic LCD Dashboard Rotation Screen Manager
  if (currentMillis - lastScreenUpdate >= SCREEN_INTERVAL) {
    lastScreenUpdate = currentMillis;
    displayDashboard();
    currentScreen = (currentScreen + 1) % 4; // Cycles through screens 0, 1, 2, 3
  }
}

// 1. Professional Startup Animation
void startupAnimation() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("SMART TRANSFORMER");
  delay(1500);

  lcd.setCursor(0, 1);
  lcd.print("AI ENGINE STARTING");
  for (int i = 0; i < 3; i++) {
    delay(500);
  }

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("SYSTEM READY");
  delay(1500);
  lcd.clear();
}

// 2. Read Sensors (Temperature and Load)
void readSensors() {
  float tempRead = dht.readTemperature();
  // Ensure the reading is valid before overwriting global state
  if (!isnan(tempRead)) {
    temperature = tempRead;
  }

  // Read Potentiometer and map to percentage load (0 to 100%)
  int potValue = analogRead(POT_PIN);
  currentLoad = (potValue / 1023.0) * 100.0;
}

// 3. Calculate Health Score (0 - 100%)
void calculateHealth() {
  // Analytical model combining temperature and load penalties
  float tempPenalty = 0.0;
  float loadPenalty = 0.0;

  // Temperature Penalty: Safe up to 40°C, linear degradation up to 85°C
  if (temperature > 40.0) {
    tempPenalty = (temperature - 40.0) * 1.5; 
  }

  // Load Penalty: Rated load up to 75%, exponential degradation beyond nominal limit
  if (currentLoad > 75.0) {
    loadPenalty = (currentLoad - 75.0) * 1.2;
  }

  int computedHealth = 100 - (int)(tempPenalty + loadPenalty);
  
  // Constrain bounds between 0% and 100%
  if (computedHealth > 100) computedHealth = 100;
  if (computedHealth < 0) computedHealth = 0;

  healthScore = computedHealth;
}

// 4. Predict Risk Level (LOW, MEDIUM, HIGH, CRITICAL)
void predictRisk() {
  if (healthScore >= 80) {
    riskLevel = "LOW";
  } else if (healthScore >= 50 && healthScore < 80) {
    riskLevel = "MEDIUM";
  } else if (healthScore >= 25 && healthScore < 50) {
    riskLevel = "HIGH";
  } else {
    riskLevel = "CRITICAL";
  }
}

// 5. Estimate Remaining Life (Years)
void estimateRemainingLife() {
  // Baseline transformer operational life span = 15 years
  // Remaining life correlates to current structural/thermal health
  remainingLifeYears = (healthScore / 100.0) * 15.0;
  if (remainingLifeYears < 0.0) {
    remainingLifeYears = 0.0;
  }
}

// 6. Failure Probability Calculations
void calculateFailureProbability() {
  // Failure probability is inversely proportional to health score
  failureProbability = 100 - healthScore;
}

// 7. Servo Automatic Cooling Actuation
void controlCooling() {
  // Dynamic positioning based on temperature profile
  if (temperature > 45.0) {
    // Open cooling valve / turn fan completely (90 degrees to 180 degrees proportional sweep)
    float sweep = map(temperature, 45, 85, 90, 180);
    int angle = constrain((int)sweep, 90, 180);
    coolingServo.write(angle);
  } else {
    // Retract servo to home positioning if normal thermal thresholds met
    coolingServo.write(0);
  }
}

// 8. Relay Protection, LED, and Buzzer Systems
void controlProtection() {
  if (riskLevel == "CRITICAL") {
    relayState = false; // Tripped state
    digitalWrite(RELAY_PIN, LOW); // De-energize system / Safe state isolation
    
    // Actuate visual and audible indicators
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);

    // 11. Edge-triggered fault counter incrementation
    if (!wasCriticalLastCheck) {
      faultCount++;
      wasCriticalLastCheck = true; 
    }
  } else {
    relayState = true;
    digitalWrite(RELAY_PIN, HIGH); // Re-engage grid contactor
    
    digitalWrite(LED_PIN, LOW);
    digitalWrite(BUZZER_PIN, LOW);
    
    wasCriticalLastCheck = false; // Reset trigger condition when cleared
  }
}

// 12. LCD Dashboard Engine (Exactly 4 Screens)
void displayDashboard() {
  lcd.clear();
  switch(currentScreen) {
    case 0:
      // Screen 1: Health & Risk Assessment
      lcd.setCursor(0, 0);
      lcd.print("Health: ");
      lcd.print(healthScore);
      lcd.print("%");
      lcd.setCursor(0, 1);
      lcd.print("Risk: ");
      lcd.print(riskLevel);
      break;

    case 1:
      // Screen 2: Real-time Telemetry parameters
      lcd.setCursor(0, 0);
      lcd.print("Temp: ");
      lcd.print(temperature, 1);
      lcd.print(" C");
      lcd.setCursor(0, 1);
      lcd.print("Load: ");
      lcd.print(currentLoad, 1);
      lcd.print("%");
      break;

    case 2:
      // Screen 3: Algorithmic Predictions
      lcd.setCursor(0, 0);
      lcd.print("Rem.Life: ");
      lcd.print(remainingLifeYears, 1);
      lcd.print("Yrs");
      lcd.setCursor(0, 1);
      lcd.print("Failure: ");
      lcd.print(failureProbability);
      lcd.print("%");
      break;

    case 3:
      // Screen 4: Operational Logbook
      lcd.setCursor(0, 0);
      lcd.print("Fault Count: ");
      lcd.print(faultCount);
      lcd.setCursor(0, 1);
      lcd.print("Relay: ");
      lcd.print(relayState ? "ON" : "OFF");
      break;
  }
}
