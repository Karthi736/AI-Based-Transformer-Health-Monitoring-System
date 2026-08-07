import { db } from "./firebase-config.js";
import {
    ref,
    update
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-database.js";

// Sliders
const voltage = document.getElementById("voltage");
const load = document.getElementById("load");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const breakerStatus = document.getElementById("breakerStatus"); // 🔌 Breaker element

// Value Labels
const voltageValue = document.getElementById("voltageValue");
const loadValue = document.getElementById("loadValue");
const temperatureValue = document.getElementById("temperatureValue");
const humidityValue = document.getElementById("humidityValue");

// Live Slider Display
voltage.addEventListener("input", () => {
    voltageValue.innerHTML = voltage.value + " V";
});

load.addEventListener("input", () => {
    loadValue.innerHTML = load.value + " %";
});

temperature.addEventListener("input", () => {
    temperatureValue.innerHTML = temperature.value + " °C";
});

humidity.addEventListener("input", () => {
    humidityValue.innerHTML = humidity.value + " %";
});

// Send Data to Firebase including Breaker State
document.getElementById("sendData").addEventListener("click", () => {
    const transformerRef = ref(db, "Transformers/TR-001");

    const currentBreaker = breakerStatus ? breakerStatus.value : "CLOSED";

    update(transformerRef, {
        transformerId: "TR-001",
        voltage: Number(voltage.value),
        load: Number(load.value),
        temperature: Number(temperature.value),
        humidity: Number(humidity.value),
        breakerState: currentBreaker, // 🔌 Breaker state-ah firebase-ku anuprom
        power: Math.round(Number(voltage.value) * (Number(load.value) / 100)),
        energy: 5.6,
        health: Number(temperature.value) > 75 ? 30 : 90,
        risk: Number(temperature.value) > 75 ? "CRITICAL" : "LOW",
        status: Number(temperature.value) > 75 ? "Overheat Fault" : "Healthy"
    })
    .then(() => {
        alert("✅ Firebase Updated Successfully from Simulator!");
    })
    .catch((error) => {
        console.error("Error updating Firebase: ", error);
        alert("❌ Update Failed!");
    });
});
