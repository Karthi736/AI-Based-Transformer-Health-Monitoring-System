document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = document.getElementById("username").value.trim().toLowerCase();
    const pass = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value.toLowerCase();
    const statusMsg = document.getElementById("statusMessage");

    statusMsg.innerHTML = "";

    // =========================
    // ADMIN LOGIN
    // =========================
    if (
        user === "admin" &&
        pass === "admin@123" &&
        role === "admin"
    ) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("userRole", role);
        localStorage.setItem("loginTime", new Date().toLocaleString());

        statusMsg.style.color = "#00ff88";
        statusMsg.textContent = "✔ Authentication Successful. Launching Dashboard...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);
    } 
    // =========================
    // OPERATOR LOGIN
    // =========================
    else if (
        user === "operator" &&
        pass === "operator@123" &&
        role === "operator"
    ) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("userRole", role);
        localStorage.setItem("loginTime", new Date().toLocaleString());

        statusMsg.style.color = "#00ff88";
        statusMsg.textContent = "✔ Authentication Successful. Launching Dashboard...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);
    } 
    // =========================
    // VIEWER LOGIN
    // =========================
    else if (
        user === "viewer" &&
        pass === "viewer@123" &&
        role === "viewer"
    ) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("role", role);
        localStorage.setItem("userRole", role);
        localStorage.setItem("loginTime", new Date().toLocaleString());

        statusMsg.style.color = "#00ff88";
        statusMsg.textContent = "✔ Authentication Successful. Launching Dashboard...";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);
    } 
    // =========================
    // INVALID LOGIN
    // =========================
    else {
        statusMsg.style.color = "#ff4d4d";
        statusMsg.textContent = "✖ Invalid User ID, Password, or Role!";
        setTimeout(() => { statusMsg.textContent = ""; }, 3000);
    }
});
