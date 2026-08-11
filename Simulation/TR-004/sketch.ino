#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <ESP32Servo.h>
#include <WiFi.h>
#include <HTTPClient.h>

// =====================================================
// SMART TRANSFORMER MONITORING SYSTEM - TR-004
// ESP32 + WOKWI + FIREBASE
// =====================================================

// ---------------- WIFI ----------------

#define WIFI_SSID "Wokwi-GUEST"
#define WIFI_PASSWORD ""

// ---------------- FIREBASE ----------------

const char* FIREBASE_URL =
"https://smart-transformer-digital-twin-default-rtdb.asia-southeast1.firebasedatabase.app";

const char* FIREBASE_PATH =
"/Transformers/TR-004.json";

// ---------------- PIN DEFINITIONS ----------------

#define DHT_PIN       4
#define DHT_TYPE      DHT22

#define POT_PIN       34

#define LED_PIN       27
#define BUZZER_PIN    25
#define SERVO_PIN     13
#define RELAY_PIN     26

#define LCD_SDA       21
#define LCD_SCL       22

// ---------------- TIMING ----------------

const unsigned long SENSOR_INTERVAL   = 1000;
const unsigned long LCD_INTERVAL      = 1000;
const unsigned long FIREBASE_INTERVAL = 750;

// ---------------- OBJECTS ----------------

LiquidCrystal_I2C lcd(0x27, 16, 2);
DHT dht(DHT_PIN, DHT_TYPE);
Servo coolingServo;

// ---------------- VARIABLES ----------------

float temperature = 0.0;
float humidity = 0.0;
float currentLoad = 0.0;

int healthScore = 100;
String riskLevel = "LOW";

float remainingLifeYears = 15.0;

int failureProbability = 0;
int faultCount = 0;

bool relayState = true;
bool coolingActive = false;
bool wasCriticalLastCheck = false;

// ---------------- TIMERS ----------------

unsigned long lastSensorRead = 0;
unsigned long lastLCDUpdate = 0;
unsigned long lastFirebaseUpdate = 0;
unsigned long lastHeartbeat = 0;

int currentScreen = 0;

// =====================================================
// WIFI CONNECTION
// =====================================================

void connectWiFi()
{
  Serial.println();
  Serial.println("Connecting to Wokwi WiFi...");

  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int attempts = 0;

  while (WiFi.status() != WL_CONNECTED && attempts < 30)
  {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  Serial.println();

  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("WiFi Connected!");
    Serial.print("ESP32 IP: ");
    Serial.println(WiFi.localIP());
  }
  else
  {
    Serial.println("WiFi Connection FAILED!");
  }
}

// =====================================================
// SETUP
// =====================================================

void setup()
{
  Serial.begin(115200);
  delay(1000);

  Serial.println();
  Serial.println("========================================");
  Serial.println(" SMART TRANSFORMER MONITORING SYSTEM");
  Serial.println(" ESP32 + FIREBASE");
  Serial.println(" TRANSFORMER: TR-004");
  Serial.println("========================================");

  pinMode(LED_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);

  digitalWrite(LED_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);
  digitalWrite(RELAY_PIN, HIGH);

  dht.begin();

  Wire.begin(LCD_SDA, LCD_SCL);

  lcd.init();
  lcd.backlight();

  coolingServo.setPeriodHertz(50);

  coolingServo.attach(
    SERVO_PIN,
    500,
    2400
  );

  coolingServo.write(0);

  // Startup screen

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("SMART TRANSFORMER");

  lcd.setCursor(0, 1);
  lcd.print("TR-004");

  delay(1500);

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("AI ENGINE");

  lcd.setCursor(0, 1);
  lcd.print("STARTING...");

  delay(1000);

  connectWiFi();

  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("TR-004 ONLINE");

  lcd.setCursor(0, 1);

  if (WiFi.status() == WL_CONNECTED)
    lcd.print("FIREBASE READY");
  else
    lcd.print("WIFI ERROR");

  delay(1500);

  lcd.clear();

  Serial.println();
  Serial.println("SETUP COMPLETE");
  Serial.println("Starting TR-004 monitoring...");
  Serial.println();
}

// =====================================================
// LOOP
// =====================================================

void loop()
{
  unsigned long now = millis();

  // HEARTBEAT

  if (now - lastHeartbeat >= 2000)
  {
    lastHeartbeat = now;
    Serial.println("LOOP RUNNING");
  }

  // SENSOR PROCESSING

  if (now - lastSensorRead >= SENSOR_INTERVAL)
  {
    lastSensorRead = now;

    readSensors();
    calculateHealth();
    predictRisk();
    estimateRemainingLife();
    calculateFailureProbability();
    controlCooling();
    controlProtection();
    printData();
  }

  // LCD DASHBOARD

  if (now - lastLCDUpdate >= LCD_INTERVAL)
  {
    lastLCDUpdate = now;

    displayDashboard();

    currentScreen++;

    if (currentScreen >= 4)
      currentScreen = 0;
  }

  // FIREBASE UPDATE

  if (now - lastFirebaseUpdate >= FIREBASE_INTERVAL)
  {
    lastFirebaseUpdate = now;

    sendToFirebase();
  }

  yield();
}

// =====================================================
// READ SENSORS
// =====================================================

void readSensors()
{
  float newTemperature = dht.readTemperature();
  float newHumidity = dht.readHumidity();

  if (!isnan(newTemperature))
    temperature = newTemperature;

  if (!isnan(newHumidity))
    humidity = newHumidity;

  int potValue = analogRead(POT_PIN);

  currentLoad =
    (potValue / 4095.0) * 100.0;

  currentLoad =
    constrain(currentLoad, 0.0, 100.0);
}

// =====================================================
// HEALTH SCORE
// =====================================================

void calculateHealth()
{
  float temperaturePenalty = 0.0;
  float loadPenalty = 0.0;

  if (temperature > 40.0)
  {
    temperaturePenalty =
      (temperature - 40.0) * 1.5;
  }

  if (currentLoad > 75.0)
  {
    loadPenalty =
      (currentLoad - 75.0) * 1.2;
  }

  int score =
    100 -
    (int)(temperaturePenalty + loadPenalty);

  score =
    constrain(score, 0, 100);

  healthScore = score;
}

// =====================================================
// RISK LEVEL
// =====================================================

void predictRisk()
{
  if (healthScore >= 80)
    riskLevel = "LOW";

  else if (healthScore >= 50)
    riskLevel = "MEDIUM";

  else if (healthScore >= 25)
    riskLevel = "HIGH";

  else
    riskLevel = "CRITICAL";
}

// =====================================================
// REMAINING LIFE
// =====================================================

void estimateRemainingLife()
{
  remainingLifeYears =
    (healthScore / 100.0) * 15.0;

  if (remainingLifeYears < 0)
    remainingLifeYears = 0;
}

// =====================================================
// FAILURE PROBABILITY
// =====================================================

void calculateFailureProbability()
{
  failureProbability =
    100 - healthScore;
}

// =====================================================
// COOLING SERVO
// =====================================================

void controlCooling()
{
  if (temperature <= 45.0)
  {
    coolingServo.write(0);
    coolingActive = false;
  }
  else
  {
    int angle =
      map(
        (int)temperature,
        45,
        85,
        90,
        180
      );

    angle =
      constrain(angle, 90, 180);

    coolingServo.write(angle);

    coolingActive = true;
  }
}

// =====================================================
// PROTECTION
// =====================================================

void controlProtection()
{
  if (riskLevel == "CRITICAL")
  {
    relayState = false;

    digitalWrite(RELAY_PIN, LOW);
    digitalWrite(LED_PIN, HIGH);
    digitalWrite(BUZZER_PIN, HIGH);

    if (!wasCriticalLastCheck)
    {
      faultCount++;
      wasCriticalLastCheck = true;
    }
  }
  else
  {
    relayState = true;

    digitalWrite(RELAY_PIN, HIGH);

    if (riskLevel == "LOW")
    {
      digitalWrite(LED_PIN, LOW);
      digitalWrite(BUZZER_PIN, LOW);
    }
    else if (riskLevel == "MEDIUM")
    {
      digitalWrite(LED_PIN, HIGH);
      digitalWrite(BUZZER_PIN, LOW);
    }
    else
    {
      digitalWrite(LED_PIN, HIGH);
      digitalWrite(BUZZER_PIN, HIGH);
    }

    wasCriticalLastCheck = false;
  }
}

// =====================================================
// LCD DASHBOARD
// =====================================================

void displayDashboard()
{
  lcd.clear();

  // SCREEN 1

  if (currentScreen == 0)
  {
    lcd.setCursor(0, 0);
    lcd.print("TR-004 H:");
    lcd.print(healthScore);
    lcd.print("%");

    lcd.setCursor(0, 1);
    lcd.print("Risk:");
    lcd.print(riskLevel);
  }

  // SCREEN 2

  else if (currentScreen == 1)
  {
    lcd.setCursor(0, 0);
    lcd.print("Temp:");
    lcd.print(temperature, 1);
    lcd.print("C");

    lcd.setCursor(0, 1);
    lcd.print("Load:");
    lcd.print(currentLoad, 1);
    lcd.print("%");
  }

  // SCREEN 3

  else if (currentScreen == 2)
  {
    lcd.setCursor(0, 0);
    lcd.print("Life:");
    lcd.print(remainingLifeYears, 1);
    lcd.print("Y");

    lcd.setCursor(0, 1);
    lcd.print("Failure:");
    lcd.print(failureProbability);
    lcd.print("%");
  }

  // SCREEN 4

  else if (currentScreen == 3)
  {
    lcd.setCursor(0, 0);
    lcd.print("Faults:");
    lcd.print(faultCount);

    lcd.setCursor(0, 1);
    lcd.print("Relay:");

    if (relayState)
      lcd.print("ON");
    else
      lcd.print("OFF");
  }
}

// =====================================================
// SERIAL MONITOR
// =====================================================

void printData()
{
  Serial.println();
  Serial.println("----------- TR-004 DATA -----------");

  Serial.print("Temperature : ");
  Serial.print(temperature, 1);
  Serial.println(" C");

  Serial.print("Humidity    : ");
  Serial.print(humidity, 1);
  Serial.println(" %");

  Serial.print("Load        : ");
  Serial.print(currentLoad, 1);
  Serial.println(" %");

  Serial.print("Health      : ");
  Serial.print(healthScore);
  Serial.println(" %");

  Serial.print("Risk        : ");
  Serial.println(riskLevel);

  Serial.print("Life        : ");
  Serial.print(remainingLifeYears, 1);
  Serial.println(" Years");

  Serial.print("Failure     : ");
  Serial.print(failureProbability);
  Serial.println(" %");

  Serial.print("Cooling     : ");
  Serial.println(
    coolingActive ? "ON" : "OFF"
  );

  Serial.print("Relay       : ");
  Serial.println(
    relayState ? "ON" : "OFF"
  );

  Serial.print("Fault Count : ");
  Serial.println(faultCount);

  Serial.println("-----------------------------------");
}

// =====================================================
// FIREBASE
// =====================================================

void sendToFirebase()
{
  if (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("WiFi disconnected!");

    connectWiFi();
    return;
  }

  String json = "{";

  json += "\"transformerId\":\"TR-004\"";

  json += ",\"temperature\":";
  json += String(temperature, 1);

  json += ",\"humidity\":";
  json += String(humidity, 1);

  json += ",\"load\":";
  json += String(currentLoad, 1);

  json += ",\"health\":";
  json += String(healthScore);

  json += ",\"risk\":\"";
  json += riskLevel;
  json += "\"";

  json += ",\"remainingLife\":";
  json += String(remainingLifeYears, 1);

  json += ",\"failureProbability\":";
  json += String(failureProbability);

  json += ",\"cooling\":";
  json += coolingActive ? "true" : "false";

  json += ",\"relay\":";
  json += relayState ? "true" : "false";

  json += ",\"faultCount\":";
  json += String(faultCount);

  json += ",\"status\":\"";

  if (riskLevel == "LOW")
    json += "Healthy";

  else if (riskLevel == "MEDIUM")
    json += "Warning";

  else if (riskLevel == "HIGH")
    json += "High Risk";

  else
    json += "Critical";

  json += "\"";

  json += "}";

  String url =
    String(FIREBASE_URL) +
    String(FIREBASE_PATH);

  HTTPClient http;

  http.setConnectTimeout(3000);
  http.setTimeout(3000);

  if (!http.begin(url))
  {
    Serial.println("HTTP begin FAILED!");
    return;
  }

  http.addHeader(
    "Content-Type",
    "application/json"
  );

  int responseCode =
    http.PUT(json);

  Serial.print("TR-004 Firebase HTTP Code: ");
  Serial.println(responseCode);

  http.end();
}