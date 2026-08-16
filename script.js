/**
 * ============================================================================
 * SMART TRANSFORMER HEALTH MONITORING & PREVENTIVE PROTECTION DASHBOARD
 * File: script.js
 * Version: 24.0 (Industrial SCADA Engine - With updateTransformerInformation)
 * Tech Stack: ES6 Modules, Firebase RTDB, Chart.js, EmailJS, jsPDF
 * ============================================================================
 */

import { db } from "./firebase-config.js";
import {
    ref,
    onValue,
    update,
    push,
    set,
    remove
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// ============================================================================
// SECTION 1: GLOBAL CONFIGURATION & CONSTANTS
// ============================================================================
const WEATHER_API = "1adcc3f853aec40949eee6603d0619ba";
const EMAILJS_PUBLIC_KEY = "dwUSS65wWB1Nk8erf";
const EMAILJS_SERVICE_ID = "service_u3o4pr4";
const EMAILJS_TEMPLATE_ID = "template_1k0c6g9";
const MAX_CHART_POINTS = 20;

let demoTimers = [];

const alarmSound = new Audio('./sounds/alarm.mp3');
alarmSound.loop = true;

if (window.emailjs) {
    window.emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ============================================================================
// TRANSFORMER CONFIGURATION & INFORMATION MAP
// ============================================================================
const TRANSFORMER_IDS = [
    "TR-001",
    "TR-002",
    "TR-003",
    "TR-004"
];

const TRANSFORMER_INFO = {
    "TR-001": {
        rating: "250 kVA",
        voltage: "11kV / 415V",
        cooling: "ONAN",
        manufacturer: "ABB",
        location: "Coimbatore"
    },

    "TR-002": {
        rating: "315 kVA",
        voltage: "11kV / 415V",
        cooling: "ONAN",
        manufacturer: "Siemens",
        location: "Chennai"
    },

    "TR-003": {
        rating: "500 kVA",
        voltage: "11kV / 433V",
        cooling: "ONAN",
        manufacturer: "Schneider",
        location: "Salem"
    },

    "TR-004": {
        rating: "630 kVA",
        voltage: "11kV / 433V",
        cooling: "ONAN",
        manufacturer: "ABB",
        location: "Erode"
    }
};

// ============================================================================
// SECTION 2: APPLICATION STATE MANAGEMENT
// ============================================================================
const state = {
    selectedTransformer: localStorage.getItem("selectedTransformer") || "TR-001",
    telemetry: {
        voltage: 230,
        load: 65,
        power: 1150,
        energy: 5.6,
        temperature: 35,
        humidity: 45,
        breakerClosed: true
    },
    scadaAlarms: {
        critical: 0,
        warning: 0,
        cleared: 0,
        total: 0,
        lastAlarmState: null,
        emailSentForCurrentFault: false
    },
    system: {
        unsubscribeFirebase: null,
        demoModeActive: false,
        startTime: Date.now()
    }
};

// ============================================================================
// SECTION 3: DOM HELPER UTILITIES & ROBUST COUNTER UPDATER
// ============================================================================
function setElementText(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = text;
}

function setElementStyle(id, property, value) {
    const el = document.getElementById(id);
    if (el) el.style[property] = value;
}

function setElementClass(id, className) {
    const el = document.getElementById(id);
    if (el) el.className = className;
}

function updateCounterInDOM(idsArray, value) {
    idsArray.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerText = value;
            el.textContent = value;
        }
    });
}

function updateSystemStatus() {
    const status = document.getElementById("systemStatus");
    if (status) {
        status.innerHTML = "ONLINE";
        status.style.color = "#00ff88";
    }
}

// ============================================================================
// COMMUNICATION DIAGNOSTICS & DYNAMIC WEATHER API ENGINE
// ============================================================================
function updateCommunicationStatus() {
    setElementText("arduinoStatus", "🟢 CONNECTED");
    setElementText("firebaseStatus", "🟢 SYNCED");
    setElementText("cloudStatus", "🟢 ONLINE");
    setElementText("dashboardStatus", "🟢 ACTIVE");

    if (navigator.onLine) {
        setElementText("internetStatus", "🟢 AVAILABLE");
    } else {
        setElementText("internetStatus", "🔴 OFFLINE");
    }

    const ping = Math.floor(Math.random() * 20) + 15;
    setElementText("latency", ping + " ms");
}

async function updateWeather() {
    const city = TRANSFORMER_INFO[state.selectedTransformer]?.location || "Coimbatore";
    console.log("🌤 Weather location:", city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather API error");
        }

        const data = await response.json();

        setElementText("weatherLocation", city);
        setElementText("weatherTemp", Math.round(data.main.temp) + "°C");
        setElementText("weatherDesc", data.weather[0].description);
        setElementText("weatherHumidity", data.main.humidity + " %");
        setElementText("weatherWind", data.wind.speed + " m/s");

        console.log(`✅ Weather updated for ${city}`);

        if (data.main.temp >= 35) {
            addNotification("High Ambient Temperature. Transformer Cooling Recommended.", "warning");
        }
    } catch (error) {
        console.error("❌ Weather Error:", error);
        setElementText("weatherLocation", city);
        setElementText("weatherDesc", "Weather Offline");
    }
}

// ============================================================================
// SECTION 3.1: VOICE ALERT ENGINE WITH CALLBACK SUPPORT
// ============================================================================
function speakAlert(message, onCompleteCallback) {
    if (!('speechSynthesis' in window)) {
        if (typeof onCompleteCallback === 'function') onCompleteCallback();
        return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance();
    speech.text = message;
    speech.lang = "en-US";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    if (typeof onCompleteCallback === 'function') {
        speech.onend = () => {
            onCompleteCallback();
        };
    }

    window.speechSynthesis.speak(speech);
}

// ============================================================================
// SECTION 3.1.5: NOTIFICATION HELPER FUNCTION
// ============================================================================
function addNotification(message, type) {
    const list = document.getElementById("notificationList");
    if (!list) return;
    const div = document.createElement("div");
    div.className = "notify-item " + type;
    div.innerHTML = "<b>" + new Date().toLocaleTimeString() + "</b><br>" + message;
    list.prepend(div);
}

// ============================================================================
// SECTION 3.2: ROLE-BASED ACCESS CONTROL
// ============================================================================
function applyRolePermissions(role) {
    const pdfBtn = document.getElementById("downloadPDF");
    const csvBtn = document.getElementById("downloadCSV");
    const emailBtn = document.getElementById("sendEmailBtn");
    const breakerBtn = document.getElementById("breakerBtn");
    const ackBtn = document.getElementById("ackBtn");

    [pdfBtn, csvBtn, emailBtn, breakerBtn, ackBtn].forEach(btn => {
        if (btn) {
            btn.disabled = false;
            btn.style.opacity = "1";
            btn.style.cursor = "pointer";
        }
    });

    if (role === "viewer") {
        [pdfBtn, csvBtn, emailBtn, breakerBtn, ackBtn].forEach(btn => {
            if (btn) {
                btn.disabled = true;
                btn.style.opacity = "0.5";
                btn.style.cursor = "not-allowed";
            }
        });
    }

    if (role === "operator") {
        if (pdfBtn) { pdfBtn.disabled = true; pdfBtn.style.opacity = "0.5"; pdfBtn.style.cursor = "not-allowed"; }
        if (csvBtn) { csvBtn.disabled = true; csvBtn.style.opacity = "0.5"; csvBtn.style.cursor = "not-allowed"; }
        if (emailBtn) { emailBtn.disabled = true; emailBtn.style.opacity = "0.5"; emailBtn.style.cursor = "not-allowed"; }
    }

    const userRoleEl = document.getElementById("userRole");
    if (userRoleEl) {
        userRoleEl.textContent = role.toUpperCase();
    }
}

// ============================================================================
// TRANSFORMER INFORMATION BOX - DYNAMIC UPDATE
// ============================================================================
function updateTransformerInformation() {
    const transformerId = state.selectedTransformer;
    const info = TRANSFORMER_INFO[transformerId];

    if (!info) {
        console.warn("Transformer information not found:", transformerId);
        return;
    }

    // Main transformer ID
    setElementText("transformerInfoId", transformerId);

    // Static transformer specifications
    setElementText("transformerRating", info.rating);
    setElementText("transformerVoltage", info.voltage);
    setElementText("transformerCooling", info.cooling);
    setElementText("transformerManufacturer", info.manufacturer);
    setElementText("transformerLocation", info.location);

    // Live values from Firebase
    setElementText(
        "transformerLiveTemperature",
        `${state.telemetry.temperature} °C`
    );

    setElementText(
        "transformerLiveLoad",
        `${state.telemetry.load.toFixed(1)} %`
    );

    setElementText(
        "transformerLiveVoltage",
        `${state.telemetry.voltage} V`
    );

    setElementText(
        "transformerLivePower",
        `${state.telemetry.power} W`
    );

    setElementText(
        "transformerLiveEnergy",
        `${state.telemetry.energy.toFixed(1)} kWh`
    );

    setElementText(
        "transformerLiveHumidity",
        `${state.telemetry.humidity} %`
    );

    setElementText(
        "transformerLiveBreaker",
        state.telemetry.breakerClosed ? "🟢 CLOSED" : "🔴 OPEN"
    );

    console.log(`📊 Transformer Information Updated: ${transformerId}`);
}

// ============================================================================
// SECTION 4: LIVE CHART MANAGEMENT
// ============================================================================
const chartLabels = [];
const voltageSeries = [];
const loadSeries = [];
const temperatureSeries = [];

function createLineChart(elementId, label, color) {
    const ctx = document.getElementById(elementId);
    if (!ctx) return null;

    return new Chart(ctx, {
        type: "line",
        data: {
            labels: chartLabels,
            datasets: [{
                label: label,
                data: elementId === "voltageChart" ? voltageSeries :
                      elementId === "loadChart" ? loadSeries : temperatureSeries,
                borderColor: color,
                backgroundColor: color + "1A",
                borderWidth: 2,
                fill: true,
                tension: 0.35,
                pointRadius: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { ticks: { color: "#888", maxRotation: 0 } },
                y: { ticks: { color: "#888" } }
            },
            plugins: {
                legend: { labels: { color: "#ccc" } }
            }
        }
    });
}

const voltageChart = createLineChart("voltageChart", "Voltage (V)", "#00e5ff");
const loadChart = createLineChart("loadChart", "Load (%)", "#00ff88");
const temperatureChart = createLineChart("temperatureChart", "Temperature (°C)", "#ff4444");

const energyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const energyData = [120, 150, 180, 140, 200, 170, 220];
const energyCanvas = document.getElementById("energyChart");
let energyChart;
if (energyCanvas) {
    energyChart = new Chart(energyCanvas, {
        type: "bar",
        data: {
            labels: energyLabels,
            datasets: [{
                label: "Energy (kWh)",
                data: energyData,
                backgroundColor: "#00e5ff",
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { labels: { color: "#ffffff" } } },
            scales: { x: { ticks: { color: "#aaa" } }, y: { ticks: { color: "#aaa" } } }
        }
    });
}

function calculatePowerQuality(voltage) {
    let sag = 0;
    let swell = 0;
    let harmonic = 2.5;
    let status = "🟢 NORMAL";

    if (voltage < 210) {
        sag = 1;
        status = "🟠 VOLTAGE SAG";
    } else if (voltage > 250) {
        swell = 1;
        status = "🔴 VOLTAGE SWELL";
    }

    let index = 100 - ((sag * 5) + (swell * 5) + harmonic);
    return { sag, swell, harmonic, status, index: Math.round(index) };
}

function calculateAssetHealth() {
    let score = 100;
    let temp = state.telemetry.temperature;
    let load = state.telemetry.load;

    if (temp > 60) score -= 10;
    if (temp > 80) score -= 25;
    if (load > 75) score -= 10;
    if (!state.telemetry.breakerClosed) score -= 20;

    return Math.max(score, 0);
}

function updateCharts(timeLabel, v, l, t) {
    chartLabels.push(timeLabel);
    voltageSeries.push(v);
    loadSeries.push(l);
    temperatureSeries.push(t);

    if (chartLabels.length > MAX_CHART_POINTS) {
        chartLabels.shift();
        voltageSeries.shift();
        loadSeries.shift();
        temperatureSeries.shift();
    }

    if (voltageChart) voltageChart.update();
    if (loadChart) loadChart.update();
    if (temperatureChart) temperatureChart.update();
}

// ============================================================================
// SECTION 5: HEALTH ENGINE & AI PREDICTION
// ============================================================================
function calculateHealthScore(temp, loadVal) {
    let score = 100;
    let tempPenalty = 0;
    let loadPenalty = 0;

    if (temp > 40) tempPenalty = (temp - 40) * 1.5;
    if (loadVal > 75) loadPenalty = (loadVal - 75) * 1.2;

    score = 100 - (tempPenalty + loadPenalty);
    return Math.max(0, Math.min(100, Math.round(score)));
}

function evaluateRiskProfile(healthScore) {
    if (healthScore >= 80) {
        return { level: "LOW", condition: "HEALTHY", recommendation: "Normal Operation", color: "#00ff88" };
    } else if (healthScore >= 60) {
        return { level: "MEDIUM", condition: "WARNING", recommendation: "Cooling Fan Inspection", color: "#ffaa00" };
    } else if (healthScore >= 40) {
        return { level: "HIGH", condition: "MAINTENANCE REQUIRED", recommendation: "Reduce Load & Schedule Maintenance", color: "#ff6600" };
    } else {
        return { level: "CRITICAL", condition: "PROTECTION ACTION REQUIRED", recommendation: "Immediate Shutdown Recommended", color: "#ff2222" };
    }
}

function getAIPredictions(temp, loadVal, healthScore) {
    const failureProbability = (100 - healthScore).toFixed(1);
    const remainingLife = ((healthScore / 100) * 15).toFixed(1);

    let aiFault = "Transformer Operating Normally";
    if (temp >= 80 && loadVal >= 90) aiFault = "🔥 Critical: Winding Insulation Failure Imminent";
    else if (temp >= 70 && loadVal >= 80) aiFault = "⚠ Warning: Overloading & Thermal Stress";
    else if (temp >= 60) aiFault = "🌡 Warning: High Winding Temperature";
    else if (loadVal >= 90) aiFault = "⚡ Heavy Electrical Load Condition";

    return { failureProbability, remainingLife, aiFault };
}

function diagnoseTransformerFault(temp, load, healthScore) {
    let fault = "No Fault Detected";
    let reason = "Transformer Operating Normally";
    let action = "Normal Operation";

    if (temp >= 80 && load >= 90) {
        fault = "🔥 Thermal Overload Fault";
        reason = "High Temperature + High Load Condition";
        action = "Reduce Load & Emergency Cooling Required";
    } else if (temp >= 70 && load < 70) {
        fault = "🌡 Cooling System Failure";
        reason = "Temperature High but Load Normal";
        action = "Inspect Cooling Fan / Oil Cooling System";
    } else if (temp >= 60) {
        fault = "⚠ Over Temperature Warning";
        reason = "Transformer Temperature Increasing";
        action = "Monitor Temperature & Cooling";
    } else if (load >= 90) {
        fault = "⚡ Overloading Condition";
        reason = "Load Demand Above Safe Limit";
        action = "Reduce Load Level";
    } else if (healthScore < 40) {
        fault = "🚨 Critical Health Condition";
        reason = "Transformer Health Score Very Low";
        action = "Immediate Maintenance Required";
    }

    return { fault, reason, action };
}

function updateEfficiency() {
    const load = state.telemetry.load;
    let efficiency = 98;

    if (load < 20) efficiency = 88;
    else if (load < 40) efficiency = 93;
    else if (load < 70) efficiency = 97;
    else if (load < 90) efficiency = 98;
    else efficiency = 95;

    setElementText("efficiency", efficiency + " %");

    let status = "⭐⭐⭐⭐⭐ Excellent";
    if (efficiency < 96) status = "⭐⭐⭐⭐ Good";
    if (efficiency < 92) status = "⭐⭐⭐ Average";
    if (efficiency < 88) status = "⭐⭐ Poor";

    setElementText("efficiencyStatus", status);
}

// ============================================================================
// SECTION 6: EVENT LOGGING & ALARM COUNTER CONTROLLER
// ============================================================================
function logSystemEvent(message, status) {
    const time = new Date().toLocaleTimeString();
    const table = document.getElementById("eventLog");
    if (table) {
        const row = document.createElement("tr");
        let color = "#00ff88";
        if (status === "WARNING") color = "orange";
        if (status === "CRITICAL") color = "red";

        row.innerHTML = `
            <td>${time}</td>
            <td>${message}</td>
            <td style="color:${color}; font-weight:bold;">${status}</td>
        `;
        table.prepend(row);
        if (table.rows.length > 10) table.deleteRow(10);
    }

    const timeline = document.getElementById("timeline");
    if (timeline) {
        const div = document.createElement("div");
        let timelineClass = status === "WARNING" ? "warning" : status === "CRITICAL" ? "danger" : "success";
        div.className = `timeline-item ${timelineClass}`;
        div.innerHTML = `${time} - ${message}`;
        timeline.prepend(div);
    }
}

function addAlarmHistory(fault, status, action) {
    const table = document.getElementById("alarmHistory");
    if (!table) return;

    let statusClass = "badge-cleared";
    if (status === "CRITICAL") statusClass = "badge-critical";
    if (status === "WARNING") statusClass = "badge-warning";

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${new Date().toLocaleTimeString()}</td>
        <td><strong>${state.selectedTransformer}</strong></td>
        <td>${fault}</td>
        <td class="${statusClass}">${status}</td>
        <td>${action}</td>
    `;
    table.prepend(row);
    if (table.rows.length > 10) table.deleteRow(10);
}

function updateScadaAlarm(type, message) {
    const timestamp = new Date().toLocaleTimeString();

    if (type === "CRITICAL") {
        state.scadaAlarms.critical++;
        state.scadaAlarms.total++;
        alarmSound.play().catch(e => console.log("Audio play blocked by browser policy:", e));
    } else if (type === "WARNING") {
        state.scadaAlarms.warning++;
        state.scadaAlarms.total++;
    }

    updateCounterInDOM(["criticalAlarm", "criticalCount", "criticalFaultsCount", "criticalFaults"], state.scadaAlarms.critical);
    updateCounterInDOM(["warningAlarm", "warningCount", "warningsCount", "warnings"], state.scadaAlarms.warning);
    updateCounterInDOM(["clearedAlarm", "clearedCount"], state.scadaAlarms.cleared);
    updateCounterInDOM(["totalFaults", "totalFaultsCount", "alertCount"], state.scadaAlarms.total);

    const latestEventEl = document.getElementById("latestEvent");
    if (latestEventEl) {
        latestEventEl.innerHTML = `<strong>${message}</strong><br><small>${timestamp} | Status: ${type}</small>`;
    }
}

function acknowledgeScadaAlarm() {
    speakAlert("Alarm acknowledged by operator.");
    alarmSound.pause();
    alarmSound.currentTime = 0;
     
    state.scadaAlarms.cleared++;
    updateCounterInDOM(["clearedAlarm", "clearedCount"], state.scadaAlarms.cleared);

    const latestEventEl = document.getElementById("latestEvent");
    if (latestEventEl) {
        latestEventEl.innerHTML = `✅ Alarm Acknowledged<br><small>${new Date().toLocaleTimeString()}</small>`;
    }

    logSystemEvent("Operator Acknowledged Alarm", "NORMAL");
    addAlarmHistory("Alarm Acknowledged", "CLEARED", "Operator ACK");
     
    closeCriticalPopup();
}

// ============================================================================
// SECTION 7: CURRENT FLOW ANIMATION & TARGETED FAULT BOX BLINKING
// ============================================================================
function updatePowerFlow(status) {
    const container = document.querySelector(".sld-container");
    if (!container) return;

    container.classList.remove("warning-flow", "flow-stopped");

    if (status === "STOP" || status === "CRITICAL") {
        container.classList.add("flow-stopped");
    } else if (status === "WARNING") {
        container.classList.add("warning-flow");
    }
}

function updateSLDStatus(temp, loadVal, breakerClosed) {
    const gridBox = document.getElementById("gridBox");
    const cbBox = document.getElementById("cbBox");
    const isoBox = document.getElementById("isolatorBox");
    const tfBox = document.getElementById("tfBox");
    const relayBox = document.getElementById("relayBox");
    const coolingBox = document.getElementById("coolingBox");
    const loadBox = document.getElementById("loadBox");

    setElementText("sldTemp", `${temp}°C`);
    setElementText("sldLoad", `${loadVal.toFixed(1)}%`);
    setElementText("sldLoadVal", `OUTPUT: ${loadVal.toFixed(1)}%`);
    setElementText("sldTransformerId", state.selectedTransformer);

    if (temp >= 60) {
        setElementText("sldFanState", "FAN: ON 🌀");
        if (coolingBox) {
            coolingBox.className = "sld-box warning";
            setElementText("coolingBadge", "ACTIVE");
            setElementClass("coolingBadge", "box-badge status-orange");
        }
    } else {
        setElementText("sldFanState", "FAN: OFF");
        if (coolingBox) {
            coolingBox.className = "sld-box normal";
            setElementText("coolingBadge", "STANDBY");
            setElementClass("coolingBadge", "box-badge status-green");
        }
    }

    if (!breakerClosed || temp >= 80) {
        if (gridBox) gridBox.className = "sld-box normal";
        if (isoBox) isoBox.className = "sld-box normal";

        if (cbBox) cbBox.className = "sld-box tripped";
        setElementText("cbBadge", "OPEN");
        setElementClass("cbBadge", "box-badge status-red");

        if (tfBox) tfBox.className = "sld-box fault-blink";
        setElementText("tfBadge", "OVERHEAT");
        setElementClass("tfBadge", "box-badge status-red");

        if (relayBox) relayBox.className = "sld-box tripped";
        setElementText("relayBadge", "TRIPPED");
        setElementClass("relayBadge", "box-badge status-red");

        if (loadBox) loadBox.className = "sld-box tripped";
        setElementText("loadBadge", "OFFLINE");
        setElementClass("loadBadge", "box-badge status-red");
    } else if (temp >= 60) {
        if (gridBox) gridBox.className = "sld-box warning";
        if (cbBox) cbBox.className = "sld-box warning";
        if (isoBox) isoBox.className = "sld-box warning";
        if (tfBox) tfBox.className = "sld-box warning";
        if (relayBox) relayBox.className = "sld-box warning";
        if (loadBox) loadBox.className = "sld-box warning";

        setElementText("cbBadge", "WARNING");
        setElementClass("cbBadge", "box-badge status-orange");
        setElementText("tfBadge", "WARNING");
        setElementClass("tfBadge", "box-badge status-orange");
        setElementText("relayBadge", "ALERT");
        setElementClass("relayBadge", "box-badge status-orange");
        setElementText("loadBadge", "ONLINE");
        setElementClass("box-badge status-green");
    } else {
        if (gridBox) gridBox.className = "sld-box normal";
        if (cbBox) cbBox.className = "sld-box normal";
        if (isoBox) isoBox.className = "sld-box normal";
        if (tfBox) tfBox.className = "sld-box normal";
        if (relayBox) relayBox.className = "sld-box normal";
        if (loadBox) loadBox.className = "sld-box normal";

        setElementText("cbBadge", "CLOSED");
        setElementClass("cbBadge", "box-badge status-green");
        setElementText("tfBadge", "HEALTHY");
        setElementClass("tfBadge", "box-badge status-green");
        setElementText("relayBadge", "ACTIVE");
        setElementClass("relayBadge", "box-badge status-green");
        setElementText("loadBadge", "ONLINE");
        setElementClass("box-badge status-green");
    }
}

function showCriticalPopup(temp, load) {
    const popup = document.getElementById("alarmPopup");
    if (popup) {
        popup.style.display = "flex";
        const content = popup.querySelector(".popup-content") || popup;
        content.classList.add("popup-shake");
        setTimeout(() => content.classList.remove("popup-shake"), 600);
    }
    setElementText("popupTemp", `${temp}°C`);
    setElementText("popupLoad", `${load}%`);
    setElementText("popupBreaker", "OPEN");
    setElementText("popupRecommendation", "Immediate Shutdown");
}

function closeCriticalPopup() {
    const popup = document.getElementById("alarmPopup");
    if (popup) {
        popup.style.display = "none";
    }
}

// ============================================================================
// SECTION 8: PRO-LEVEL PDF & CSV REPORT GENERATION
// ============================================================================
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.setFillColor(13, 110, 253);
    pdf.rect(0, 0, 210, 30, 'F');

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(15);
    pdf.setTextColor(255, 255, 255);
    pdf.text("SMART TRANSFORMER HEALTH MONITORING", 14, 14);

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text("SCADA Preventive Protection & Analytics Report", 14, 21);

    pdf.setTextColor(50, 50, 50);
    pdf.setFontSize(10);
    pdf.text(`Transformer ID: ${state.selectedTransformer}`, 14, 40);
    pdf.text(`Generated On: ${new Date().toLocaleString()}`, 14, 46);
    pdf.text(`System Status: ONLINE`, 155, 40);

    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(14, 52, 196, 52);

    const health = calculateHealthScore(state.telemetry.temperature, state.telemetry.load);
    const risk = evaluateRiskProfile(health);
    const ai = getAIPredictions(state.telemetry.temperature, state.telemetry.load, health);

    const tableData = [
        ["Parameter", "Live Value", "Status / Remarks"],
        ["Voltage", `${state.telemetry.voltage} V`, "Normal"],
        ["Load Percentage", `${state.telemetry.load.toFixed(1)}%`, state.telemetry.load > 75 ? "High Load" : "Optimal"],
        ["Active Power", `${state.telemetry.power} W`, "Stable"],
        ["Energy Consumption", `${state.telemetry.energy.toFixed(1)} kWh`, "Cumulative"],
        ["Winding Temperature", `${state.telemetry.temperature} °C`, state.telemetry.temperature > 60 ? "Warning" : "Normal"],
        ["Ambient Humidity", `${state.telemetry.humidity}%`, "Normal"],
        ["Circuit Breaker State", state.telemetry.breakerClosed ? "CLOSED" : "OPEN (Tripped)", state.telemetry.breakerClosed ? "Safe" : "Fault Action"],
        ["System Health Score", `${health}%`, risk.level],
        ["Risk Assessment", risk.condition, risk.recommendation],
        ["Failure Probability", `${ai.failureProbability}%`, "AI Prediction"],
        ["Estimated Remaining Life", `${ai.remainingLife} Years`, "Asset Longevity"],
        ["AI Diagnosis", ai.aiFault, "Automated Insight"]
    ];

    if (typeof pdf.autoTable === 'function') {
        pdf.autoTable({
            startY: 58,
            head: [tableData[0]],
            body: tableData.slice(1),
            theme: 'grid',
            headStyles: { fillColor: [13, 110, 253], textColor: [255, 255, 255], fontStyle: 'bold' },
            bodyStyles: { textColor: [40, 40, 40], fontSize: 9 },
            alternateRowStyles: { fillColor: [245, 247, 250] },
            margin: { left: 14, right: 14 }
        });
    } else {
        let startY = 60;
        tableData.forEach((row) => {
            pdf.text(`${row[0]}: ${row[1]} (${row[2]})`, 14, startY);
            startY += 7;
        });
    }

    const pageHeight = pdf.internal.pageSize.height;
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text("Confidential - Smart Transformer IoT SCADA System Generated Report", 14, pageHeight - 10);

    pdf.save(`${state.selectedTransformer}_Health_Report.pdf`);
    logSystemEvent("Pro PDF Report Downloaded Successfully", "NORMAL");
}

function generateCSV() {
    let csv = "Time,Transformer,Voltage(V),Load(%),Temperature(°C),Power(W),Energy(kWh),Health(%),Risk\n";

    const health = calculateHealthScore(state.telemetry.temperature, state.telemetry.load);
    const risk = evaluateRiskProfile(health);

    csv += `${new Date().toLocaleString()},${state.selectedTransformer},${state.telemetry.voltage},${state.telemetry.load},${state.telemetry.temperature},${state.telemetry.power},${state.telemetry.energy},${health},${risk.level}`;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${state.selectedTransformer}_Report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    logSystemEvent("CSV Report Downloaded", "NORMAL");
    addNotification("CSV Report Downloaded", "normal");
}

// ============================================================================
// SECTION 9: SCADA ALARM EVALUATION & UI SYNCHRONIZATION
// ============================================================================
function updateSensorHealth() {
    if (state.telemetry.temperature >= 80) {
        setElementText("dhtStatus", "🔴 OVERHEATED");
    } else {
        setElementText("dhtStatus", "🟢 HEALTHY");
    }

    setElementText("voltStatus", "🟢 HEALTHY");
    setElementText("currentStatus", "🟢 HEALTHY");
    setElementText("relayHealth", state.telemetry.breakerClosed ? "🟢 HEALTHY" : "🟠 ACTIVE");
    setElementText("servoHealth", state.telemetry.temperature >= 60 ? "🟢 RUNNING" : "⚪ STANDBY");
    setElementText("firebaseHealth", "🟢 CONNECTED");
}

function updateDashboardUI() {
    updateTransformerInformation();

    const { voltage, load, power, energy, temperature, humidity, breakerClosed } = state.telemetry;

    setElementText("voltage", `${voltage} V`);
    setElementText("load", `${load.toFixed(1)}%`);
    setElementText("power", `${power} W`);
    setElementText("energy", `${energy.toFixed(1)} kWh`);
    setElementText("temperature", `${temperature}°C`);
    setElementText("humidity", `${humidity}%`);

    setElementText("breakerStatus", breakerClosed ? "● CLOSED" : "● OPEN");
    setElementClass("breakerStatus", breakerClosed ? "status-green" : "status-red");

    const breakerBtn = document.getElementById("breakerBtn");
    if (breakerBtn) {
        breakerBtn.innerHTML = breakerClosed ? "🔴 Open Breaker" : "🟢 Close Breaker";
    }

    let currentEnergy = state.telemetry.energy;
    setElementText("todayEnergy", currentEnergy.toFixed(1) + " kWh");
    setElementText("weekEnergy", (currentEnergy * 7).toFixed(1) + " kWh");
    setElementText("monthEnergy", (currentEnergy * 30).toFixed(1) + " kWh");

    const pq = calculatePowerQuality(state.telemetry.voltage);
    setElementText("voltageStatus", pq.status);
    setElementText("voltageSag", pq.sag);
    setElementText("voltageSwell", pq.swell);
    setElementText("harmonics", pq.harmonic + "%");
    setElementText("pqIndex", pq.index + "%");

    let assetScore = calculateAssetHealth();
    setElementText("assetScore", assetScore + "%");
    if (assetScore >= 90) setElementText("assetRating", "⭐⭐⭐⭐⭐ Excellent");
    else if (assetScore >= 70) setElementText("assetRating", "⭐⭐⭐⭐ Good");
    else setElementText("assetRating", "⚠ Maintenance Required");

    setElementText("assetTempStatus", state.telemetry.temperature < 60 ? "🟢 GOOD" : "🟠 HIGH");
    setElementText("assetLoadStatus", state.telemetry.load < 75 ? "🟢 NORMAL" : "🟠 OVERLOAD");
    setElementText("assetCoolingStatus", state.telemetry.temperature >= 60 ? "🌀 ACTIVE" : "❄ READY");
    setElementText("assetProtectionStatus", state.telemetry.breakerClosed ? "🟢 ACTIVE" : "🔴 TRIPPED");

    const health = calculateHealthScore(temperature, load);
    const risk = evaluateRiskProfile(health);
    const ai = getAIPredictions(temperature, load, health);

    const diagnosis = diagnoseTransformerFault(temperature, load, health);
    setElementText("faultDiagnosis", diagnosis.fault);
    setElementText("faultReason", diagnosis.reason);
    setElementText("faultAction", diagnosis.action);

    const oilTemp = state.telemetry.temperature - 5;
    const oilLevel = 100 - (state.telemetry.load * 0.12);
    const oilQuality = calculateHealthScore(oilTemp, state.telemetry.load);
    const moisture = Math.round(10 + (100 - oilQuality) / 2);

    setElementText("oilTemp", oilTemp.toFixed(0) + "°C");
    setElementText("oilLevel", oilLevel.toFixed(0) + "%");
    setElementText("oilMoisture", moisture + " ppm");

    let quality = "GOOD";
    let statusText = "🟢 HEALTHY";
    let color = "#00ff88";

    if (oilQuality < 60) {
        quality = "POOR";
        statusText = "🔴 OIL REPLACEMENT";
        color = "#ff3333";
    } else if (oilQuality < 80) {
        quality = "AVERAGE";
        statusText = "🟠 DEGRADED";
        color = "#ff9900";
    }

    setElementText("oilQuality", quality);
    const oilStatus = document.getElementById("oilStatus");
    if (oilStatus) {
        oilStatus.innerHTML = statusText;
        oilStatus.style.color = color;
    }

    const efficiencyVal = 97;
    const oilHealth = oilQuality;
    const weatherHealth = 100;
    const overall = Math.round(
        health * 0.40 +
        efficiencyVal * 0.20 +
        (100 - load) * 0.15 +
        oilHealth * 0.15 +
        weatherHealth * 0.10
    );

    setElementText("overallScore", overall + "%");
    const circleOverall = document.querySelector(".overall-circle");
    const deg = overall * 3.6;
    let overallColor = "#00ff88";
    let stars = "⭐⭐⭐⭐⭐";
    let overallStatusText = "EXCELLENT";

    if (overall < 95) { overallColor = "#00d9ff"; stars = "⭐⭐⭐⭐"; overallStatusText = "GOOD"; }
    if (overall < 80) { overallColor = "#ffaa00"; stars = "⭐⭐⭐"; overallStatusText = "WARNING"; }
    if (overall < 60) { overallColor = "#ff3333"; stars = "⭐⭐"; overallStatusText = "CRITICAL"; }

    if (circleOverall) {
        circleOverall.style.background = `conic-gradient(${overallColor} 0deg, ${overallColor} ${deg}deg, #222 ${deg}deg, #222 360deg)`;
    }

    setElementText("overallStars", stars);
    setElementText("overallStatus", overallStatusText);
    setElementStyle("overallStatus", "color", overallColor);

    const loadPercent = state.telemetry.load;
    const circle = document.querySelector(".loading-circle");
    const text = document.getElementById("loadingPercent");
    const status = document.getElementById("loadingStatus");

    if (text) text.innerHTML = loadPercent.toFixed(0) + "%";
    const degree = loadPercent * 3.6;
    let circleColor = "#00ff88";
    let stateText = "🟢 NORMAL";

    if (status) status.className = "loading-green";

    if (loadPercent >= 90) {
        circleColor = "#ff3333";
        stateText = "🔴 OVERLOAD";
        if (status) status.className = "loading-red";
    } else if (loadPercent >= 80) {
        circleColor = "#ff8800";
        stateText = "🟠 HIGH LOAD";
        if (status) status.className = "loading-orange";
    } else if (loadPercent >= 60) {
        circleColor = "#ffd000";
        stateText = "🟡 MEDIUM";
        if (status) status.className = "loading-yellow";
    }

    if (circle) {
        circle.style.background = `conic-gradient(${circleColor} 0deg, ${circleColor} ${degree}deg, #202020 ${degree}deg, #202020 360deg)`;
    }

    if (status) status.innerHTML = stateText;

    if (!state.system.demoModeActive) {
        if (!breakerClosed || temperature >= 80) {
            if (state.scadaAlarms.lastAlarmState !== "CRITICAL") {
                updateScadaAlarm("CRITICAL", "Protection Trip - High Temp / Breaker Open");
                addAlarmHistory("Critical Overheat / Trip", "CRITICAL", "Automatic Protection Active");
                state.scadaAlarms.lastAlarmState = "CRITICAL";
                
                logSystemEvent(`Critical Fault Detected: ${temperature}°C`, "CRITICAL");
                addNotification(`CRITICAL: ${state.selectedTransformer} reached ${temperature}°C!`, "danger");

                speakAlert(`Warning! Critical temperature reached on transformer ${state.selectedTransformer}. Temperature is ${temperature} degrees Celsius. Immediate shutdown recommended.`, () => {
                    showCriticalPopup(temperature, load);
                    if (!state.scadaAlarms.emailSentForCurrentFault) {
                        state.scadaAlarms.emailSentForCurrentFault = true;
                        sendAlertEmail(temperature, load, health);
                    }
                });
            }
        } else if (temperature >= 60 || load > 75) {
            if (state.scadaAlarms.lastAlarmState !== "WARNING") {
                updateScadaAlarm("WARNING", "High Temperature or High Load Warning");
                addAlarmHistory("Temperature / Load Warning", "WARNING", "Cooling Fan / Load Monitor");
                state.scadaAlarms.lastAlarmState = "WARNING";
                
                logSystemEvent(`Warning: Temperature elevated to ${temperature}°C`, "WARNING");
                addNotification(`WARNING: High load or temperature on ${state.selectedTransformer}`, "warning");
            }
        } else {
            state.scadaAlarms.lastAlarmState = "NORMAL";
            state.scadaAlarms.emailSentForCurrentFault = false;
        }
    }

    setElementText("health", `${health}%`);
    setElementText("risk", risk.level);
    setElementStyle("risk", "color", risk.color);
    setElementText("condition", risk.condition);
    setElementStyle("condition", "color", risk.color);
    setElementText("failure", `${ai.failureProbability}%`);
    setElementText("life", `${ai.remainingLife} Years`);
    setElementText("recommendation", risk.recommendation);
    setElementText("aiFault", ai.aiFault);

    setElementText("failurePercent", `${ai.failureProbability}%`);
    setElementText("lifePrediction", `${ai.remainingLife} Years`);
    setElementText("aiRecommendation", ai.aiFault);
    setElementStyle("failureFill", "width", `${ai.failureProbability}%`);

    updateSLDStatus(temperature, load, breakerClosed);
    updatePowerFlow(risk.level);

    const timeStamp = new Date().toLocaleTimeString();
    updateCharts(timeStamp, voltage, load, temperature);
    setElementText("lastUpdate", `Last Update : ${timeStamp}`);

    updateSensorHealth();
    updateCommunicationStatus();
    updateEfficiency();
}

function initializeTransformerSelector() {
    const selectEl = document.getElementById("transformerSelect");

    if (!selectEl) {
        console.warn("Transformer selector #transformerSelect not found.");
        return;
    }

    selectEl.innerHTML = "";

    TRANSFORMER_IDS.forEach((transformerId) => {
        const option = document.createElement("option");
        option.value = transformerId;
        option.textContent = transformerId;
        selectEl.appendChild(option);
    });

    const savedTransformer = localStorage.getItem("selectedTransformer");

    if (TRANSFORMER_IDS.includes(savedTransformer)) {
        state.selectedTransformer = savedTransformer;
    } else {
        state.selectedTransformer = "TR-001";
        localStorage.setItem("selectedTransformer", "TR-001");
    }

    selectEl.value = state.selectedTransformer;
}

// ============================================================================
// SECTION 10: FIREBASE REALTIME DATABASE - TRANSFORMER LIVE DATA
// ============================================================================
function connectToTransformer(transformerId) {
    if (!TRANSFORMER_IDS.includes(transformerId)) {
        console.warn("Invalid transformer ID:", transformerId);
        return;
    }

    if (state.system.unsubscribeFirebase) {
        state.system.unsubscribeFirebase();
        state.system.unsubscribeFirebase = null;
    }

    const transformerRef = ref(db, `Transformers/${transformerId}`);

    console.log(`🔄 Connecting Firebase: Transformers/${transformerId}`);

    state.system.unsubscribeFirebase = onValue(
        transformerRef,
        (snapshot) => {
            if (state.system.demoModeActive) {
                return;
            }

            const data = snapshot.val();

            if (!data) {
                console.warn(`No Firebase data found for ${transformerId}`);
                addNotification(`${transformerId}: No live data available`, "warning");
                return;
            }

            state.telemetry.voltage = Number(data.voltage ?? state.telemetry.voltage);
            state.telemetry.temperature = Number(data.temperature ?? state.telemetry.temperature);
            state.telemetry.load = Number(data.load ?? state.telemetry.load);
            state.telemetry.power = Number(data.power ?? (state.telemetry.voltage * (state.telemetry.load * 0.5)));
            state.telemetry.energy = Number(data.energy ?? state.telemetry.energy);
            state.telemetry.humidity = Number(data.humidity ?? state.telemetry.humidity);

            const remoteBreaker = data.breakerState ?? data.relayState ?? data.breaker ?? data.breakerClosed;

            if (remoteBreaker !== undefined) {
                if (typeof remoteBreaker === "string") {
                    const breakerValue = remoteBreaker.trim().toUpperCase();
                    state.telemetry.breakerClosed = (
                        breakerValue === "CLOSED" ||
                        breakerValue === "ON" ||
                        breakerValue === "1" ||
                        breakerValue === "TRUE"
                    );
                } else {
                    state.telemetry.breakerClosed = Boolean(remoteBreaker);
                }
            }

            updateDashboardUI();
            console.log(`✅ ${transformerId} live data updated`, data);
        },
        (error) => {
            console.error(`❌ Firebase error for ${transformerId}:`, error);
            logSystemEvent(`${transformerId} Firebase Sync Error`, "WARNING");
            addNotification(`${transformerId}: Firebase connection error`, "warning");
        }
    );
}

function sendAlertEmail(temp, loadVal, health) {
    if (!window.emailjs) return;

    const risk = evaluateRiskProfile(health);

    window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
            to_name: "Substation Chief Engineer",
            transformer: state.selectedTransformer,
            transformer_id: state.selectedTransformer,
            temperature: `${temp} °C`,
            load: `${loadVal.toFixed(1)} %`,
            load_level: `${loadVal.toFixed(1)} %`,
            health: `${health}%`,
            risk: risk.level,
            status: risk.level,
            condition: risk.condition,
            recommendation: risk.recommendation,
            message: risk.recommendation,
            failure: `${(100 - health).toFixed(1)}%`,
            time: new Date().toLocaleString()
        }
    )
    .then(() => {
        console.log("✅ Alert Email Dispatched Successfully");
        logSystemEvent("Email Alert Dispatched Successfully", "NORMAL");
        addNotification("Automated warning email sent to engineer.", "success");
        const statusEl = document.getElementById("emailAlertStatus");
        if (statusEl) statusEl.innerHTML = "Sent Successfully ✔";
    })
    .catch((err) => {
        console.error("❌ EmailJS Dispatch Error:", err);
        logSystemEvent("Email Dispatch Failed", "WARNING");
    });
}

// ============================================================================
// SECTION 10.1: FIREBASE MAINTENANCE LOG SAVE, LOAD & DELETE
// ============================================================================
function saveMaintenanceRecord() {
    const fault = document.getElementById("maintFault").value;
    const action = document.getElementById("maintAction").value;
    const person = document.getElementById("maintPerson").value;
    const status = document.getElementById("maintStatus").value;

    if (!fault || !action || !person) {
        alert("Fill All Maintenance Details");
        return;
    }

    const maintenanceRef = ref(db, `Transformers/${state.selectedTransformer}/Maintenance_Log`);
    const newRecord = push(maintenanceRef);
     
    set(newRecord, {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        fault: fault,
        action: action,
        technician: person,
        status: status
    }).then(() => {
        alert("✅ Maintenance Record Saved");
        document.getElementById("maintFault").value = "";
        document.getElementById("maintAction").value = "";
        document.getElementById("maintPerson").value = "";
    }).catch(error => {
        console.error("Firebase Save Error:", error);
    });
}

function loadMaintenanceHistory() {
    const maintenanceRef = ref(
        db,
        `Transformers/${state.selectedTransformer}/Maintenance_Log`
    );

    onValue(maintenanceRef, (snapshot) => {
        const table = document.getElementById("maintenanceLog");
        if (!table) return;

        table.innerHTML = "";

        snapshot.forEach((child) => {
            const data = child.val();
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${data.date || ""}</td>
                <td>${data.fault || ""}</td>
                <td>${data.action || ""}</td>
                <td>${data.technician || ""}</td>
                <td class="status-green">${data.status || ""}</td>
                <td>
                    <button
                        class="delete-btn"
                        data-id="${child.key}">
                        🗑️
                    </button>
                </td>
            `;

            row
                .querySelector(".delete-btn")
                .addEventListener("click", () => {
                    deleteMaintenanceRecord(child.key);
                });

            table.prepend(row);
        });
    });
}

function deleteMaintenanceRecord(id) {
    const role = localStorage.getItem("role") || localStorage.getItem("userRole");
    if (role !== "admin") {
        alert("❌ Admin Access Required");
        return;
    }

    const recordRef = ref(db, `Transformers/${state.selectedTransformer}/Maintenance_Log/${id}`);
    remove(recordRef).then(() => {
        alert("✅ Record Deleted");
        loadMaintenanceHistory();
    }).catch(error => {
        console.error(error);
    });
}

// ============================================================================
// SECTION 11: INDUSTRIAL 10-STEP DEMO SIMULATION ENGINE
// ============================================================================
function runDemoSimulation() {
    if (state.system.demoModeActive) return;

    if (state.system.unsubscribeFirebase) {
        state.system.unsubscribeFirebase();
        state.system.unsubscribeFirebase = null;
    }

    state.system.demoModeActive = true;

    const aiPredictionCard = document.getElementById("ai-top-section");
    if (aiPredictionCard) {
        aiPredictionCard.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    state.telemetry.voltage = 230;
    state.telemetry.temperature = 35;
    state.telemetry.load = 50;
    state.telemetry.breakerClosed = true;
    updatePowerFlow("NORMAL");
    updateDashboardUI();
    logSystemEvent("Demo Simulation Started - STEP 1: System Normal", "NORMAL");
    addNotification("Demo simulation running...", "warning");

    demoTimers.push(setTimeout(() => {
        logSystemEvent("STEP 2: Temperature Increasing Normal Range", "NORMAL");
        state.telemetry.voltage = 235;
        state.telemetry.temperature = 45;
        updateDashboardUI();

        demoTimers.push(setTimeout(() => {
            state.telemetry.temperature = 55;
            updateDashboardUI();
        }, 2000));
    }, 4000));

    demoTimers.push(setTimeout(() => {
        logSystemEvent("STEP 3: Cooling Fan Activated", "WARNING");
        speakAlert("Warning. Transformer temperature is increasing. Cooling fan activated.");
        addNotification("Cooling Fan Activated", "warning");
         
        state.telemetry.voltage = 240;
        state.telemetry.temperature = 60;
        state.telemetry.load = 65;
        updatePowerFlow("WARNING");
        updateDashboardUI();

        updateScadaAlarm("WARNING", "High Temperature Warning Level");
        addAlarmHistory("High Temperature Warning", "WARNING", "Cooling Fan ON");

        const alarmEl = document.getElementById("alarm");
        const coolingEl = document.getElementById("cooling");
        if (alarmEl) { alarmEl.innerHTML = "🟠 WARNING ALARM"; alarmEl.style.color = "orange"; }
        if (coolingEl) { coolingEl.innerHTML = "🌀 FAN ON"; coolingEl.style.color = "orange"; }
    }, 10000));

    demoTimers.push(setTimeout(() => {
        logSystemEvent("STEP 4: Thermal Stress - Temp at 70°C", "WARNING");
        state.telemetry.voltage = 245;
        state.telemetry.temperature = 70;
        state.telemetry.load = 75;
        updateDashboardUI();
    }, 14000));

    demoTimers.push(setTimeout(() => {
        logSystemEvent("STEP 5: Protection Trip Triggered - Overheat Fault!", "CRITICAL");
        addNotification("Protection Relay Tripped", "critical");

        state.telemetry.voltage = 255;
        state.telemetry.temperature = 80;
        state.telemetry.load = 85;
        state.telemetry.breakerClosed = false;

        updatePowerFlow("STOP");
        updateDashboardUI();

        setElementText("relayStatus", "🔴 TRIPPED");
        setElementText("relay", "🔴 DISCONNECTED");

        const alarmEl = document.getElementById("alarm");
        const coolingEl = document.getElementById("cooling");
        if (alarmEl) { alarmEl.innerHTML = "🔴 CRITICAL FAULT"; alarmEl.style.color = "red"; }
        if (coolingEl) { coolingEl.innerHTML = "🌀 EMERGENCY COOLING"; coolingEl.style.color = "red"; }

        speakAlert("Critical alert. Transformer temperature exceeded safe limit. Protection relay tripped. Breaker opened immediately.", () => {
            logSystemEvent("STEP 6: Critical Popup Alert Rendered (Voice Finished)", "CRITICAL");
            showCriticalPopup(80, 85);
             
            updateScadaAlarm("CRITICAL", "Protection Trip - High Temp");
            addAlarmHistory("Protection Trip", "CRITICAL", "Breaker Opened / Relay Tripped");

            demoTimers.push(setTimeout(() => {
                logSystemEvent("STEP 8: Automated Email Alert Dispatched", "CRITICAL");
                const health = calculateHealthScore(80, 85);
                sendAlertEmail(80, 85, health);
            }, 2000));
        });
    }, 19000));
}

// ============================================================================
// SECTION 11.5: OPERATOR TOGGLE BREAKER FUNCTION
// ============================================================================
async function toggleBreaker() {
    if (state.system.demoModeActive) {
        alert("Please wait for the demo simulation to finish or reset.");
        return;
    }

    state.telemetry.breakerClosed = !state.telemetry.breakerClosed;
    const status = state.telemetry.breakerClosed;
    const statusStr = status ? "CLOSED" : "OPEN";

    updateDashboardUI();

    try {
        await update(
            ref(db, `Transformers/${state.selectedTransformer}`),
            {
                breakerState: statusStr,
                relayState: statusStr,
                breaker: status ? 1 : 0,
                breakerClosed: status
            }
        );
    } catch (err) {
        console.error("Firebase update failed:", err);
    }

    if (status) {
        logSystemEvent("Circuit Breaker CLOSED by Operator", "NORMAL");
        speakAlert("Breaker Closed Successfully");
    } else {
        logSystemEvent("Circuit Breaker OPENED by Operator", "CRITICAL");
        speakAlert("Warning. Breaker Opened.");
    }
}

// ============================================================================
// SECTION 12: REAL-TIME LIVE CLOCK & INITIALIZATION
// ============================================================================
function startUptimeTimer() {
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString();

        const timerEl = document.getElementById("uptimeTimer");
        if (timerEl) {
            timerEl.innerText = timeString;
            timerEl.textContent = timeString;
        }

        const liveClockEl = document.getElementById("liveClock");
        if (liveClockEl) {
            liveClockEl.innerText = timeString;
            liveClockEl.textContent = timeString;
        }

        const footer = document.getElementById("footerUptimeTimer");
        if (footer) {
            footer.innerText = timeString;
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "../login.html";
        return;
    }

    updateSystemStatus();
    startUptimeTimer();

    updateWeather();
    setInterval(updateWeather, 600000);

    const bell = document.getElementById("notification");
    const panel = document.getElementById("notificationPanel");
    const close = document.getElementById("closeNotification");
     
    if (bell && panel) {
        bell.addEventListener("click", () => {
            panel.classList.toggle("active");
            panel.style.display = panel.style.display === "block" ? "none" : "block";
        });
    }
    if (close && panel) {
        close.addEventListener("click", () => {
            panel.classList.remove("active");
            panel.style.display = "none";
        });
    }

    const role = localStorage.getItem("userRole") || localStorage.getItem("role") || "admin";
    applyRolePermissions(role);

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            console.log("Logout button clicked");
            localStorage.clear();
            location.replace("login.html");
        });
    }

    const popupAck = document.getElementById("popupAck");
    if (popupAck) {
        popupAck.addEventListener("click", () => {
            acknowledgeScadaAlarm();

            if (state.system.demoModeActive) {
                logSystemEvent("STEP 9: Operator Acknowledged - Reset in 5s", "NORMAL");
                 
                setTimeout(() => {
                    logSystemEvent("STEP 10: Demo Completed - System Restored to Healthy State", "NORMAL");
                    speakAlert("System restored successfully. Transformer is operating normally.");
                    addNotification("Transformer Restored Successfully", "normal");

                    state.telemetry.voltage = 230;
                    state.telemetry.temperature = 35;
                    state.telemetry.load = 50;
                    state.telemetry.breakerClosed = true;

                    updatePowerFlow("NORMAL");
                    setElementText("relayStatus", "🟢 ACTIVE");
                    setElementText("relay", "🟢 CONNECTED");

                    const alarmEl = document.getElementById("alarm");
                    const coolingEl = document.getElementById("cooling");
                    if (alarmEl) { alarmEl.innerHTML = "🟢 NO FAULT"; alarmEl.style.color = "#00ff88"; }
                    if (coolingEl) { coolingEl.innerHTML = "❄ OFF"; coolingEl.style.color = "cyan"; }

                    updateDashboardUI();

                    state.system.demoModeActive = false;
                    connectToTransformer(state.selectedTransformer);
                }, 5000);
            }
        });
    }

    // ============================================================================
    // TRANSFORMER SELECTION & INITIALIZATION
    // ============================================================================
    initializeTransformerSelector();

    const selectEl = document.getElementById("transformerSelect");
    if (selectEl) {
        selectEl.addEventListener("change", (event) => {
            const selectedId = event.target.value;

            if (!TRANSFORMER_IDS.includes(selectedId)) {
                console.warn("Invalid transformer selected:", selectedId);
                return;
            }

            state.selectedTransformer = selectedId;

            localStorage.setItem("selectedTransformer", selectedId);

            console.log("🔄 Selected Transformer:", selectedId);
            console.log("📍 Location:", TRANSFORMER_INFO[selectedId].location);

            // Update information box immediately
            updateTransformerInformation();

            // Connect to selected transformer Firebase path
            connectToTransformer(selectedId);
            loadMaintenanceHistory();
            updateWeather();

            logSystemEvent(
                `Switched monitoring view to asset: ${selectedId}`,
                "NORMAL"
            );

            addNotification(
                `Monitoring ${selectedId}`,
                "success"
            );
        });
    }

    const demoBtn = document.getElementById("demoBtn");
    if (demoBtn) {
        demoBtn.addEventListener("click", () => {
            if (state.system.demoModeActive) {
                demoTimers.forEach(timer => clearTimeout(timer));
                demoTimers = [];
                state.system.demoModeActive = false;
                if (demoBtn) demoBtn.innerHTML = "🎬 Start Demo Simulation";
                logSystemEvent("Demo Simulation Stopped. Resumed Live Firebase Sync.", "NORMAL");
                addNotification("Demo simulation ended.", "success");
                connectToTransformer(state.selectedTransformer);
            } else {
                runDemoSimulation();
                if (demoBtn) demoBtn.innerHTML = "⏹ Stop Simulation";
            }
        });
    }

    const pdfBtn = document.getElementById("downloadPDF");
    if (pdfBtn) {
        pdfBtn.addEventListener("click", generatePDF);
    }

    const csvBtn = document.getElementById("downloadCSV");
    if (csvBtn) {
        csvBtn.addEventListener("click", generateCSV);
    }

    const ackBtn = document.getElementById("ackBtn");
    if (ackBtn) {
        ackBtn.addEventListener("click", () => {
            acknowledgeScadaAlarm();

            if (state.system.demoModeActive) {
                logSystemEvent("STEP 9: Operator Acknowledged - Reset in 5s", "NORMAL");
                 
                setTimeout(() => {
                    logSystemEvent("STEP 10: Demo Completed - System Restored to Healthy State", "NORMAL");
                    speakAlert("System restored successfully. Transformer is operating normally.");
                    addNotification("Transformer Restored Successfully", "normal");

                    state.telemetry.voltage = 230;
                    state.telemetry.temperature = 35;
                    state.telemetry.load = 50;
                    state.telemetry.breakerClosed = true;

                    updatePowerFlow("NORMAL");
                    setElementText("relayStatus", "🟢 ACTIVE");
                    setElementText("relay", "🟢 CONNECTED");

                    const alarmEl = document.getElementById("alarm");
                    const coolingEl = document.getElementById("cooling");
                    if (alarmEl) { alarmEl.innerHTML = "🟢 NO FAULT"; alarmEl.style.color = "#00ff88"; }
                    if (coolingEl) { coolingEl.innerHTML = "❄ OFF"; coolingEl.style.color = "cyan"; }

                    updateDashboardUI();

                    state.system.demoModeActive = false;
                    connectToTransformer(state.selectedTransformer);
                }, 5000);
            }
        });
    }

    const breakerBtn = document.getElementById("breakerBtn");
    if (breakerBtn) {
        breakerBtn.addEventListener("click", toggleBreaker);
    }

    const sendEmailBtn = document.getElementById("sendEmailBtn");
    if (sendEmailBtn) {
        sendEmailBtn.addEventListener("click", () => {
            const health = calculateHealthScore(state.telemetry.temperature, state.telemetry.load);
            logSystemEvent("Manual Email Alert Dispatch Initiated", "WARNING");
            sendAlertEmail(state.telemetry.temperature, state.telemetry.load, health);
        });
    }

    const themeBtn = document.getElementById("themeBtn");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            const isLight = document.body.classList.contains("light-theme");
            localStorage.setItem("theme", isLight ? "light" : "dark");
        });

        if (localStorage.getItem("theme") === "light") {
            document.body.classList.add("light-theme");
        }
    }

    const addMaintenanceBtn = document.getElementById("addMaintenanceBtn");
    if (addMaintenanceBtn) {
        addMaintenanceBtn.addEventListener("click", saveMaintenanceRecord);
    }

    // ============================================================================
    // INITIALIZE TRANSFORMER MONITORING
    // ============================================================================
    connectToTransformer(state.selectedTransformer);
    loadMaintenanceHistory();
    logSystemEvent(`SCADA Core System Online - ${state.selectedTransformer}`, "NORMAL");
});

window.deleteMaintenanceRecord = deleteMaintenanceRecord;