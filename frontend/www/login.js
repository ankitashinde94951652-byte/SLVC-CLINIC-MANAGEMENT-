// ✅ Railway URL कॉन्फिगरेशन
const API_BASE_URL = "https://slvc-clinic-management-production.up.railway.app/api";

document.addEventListener("DOMContentLoaded", function () {
    let role = "patient";

    const patientBtn = document.getElementById("patientBtn");
    const doctorBtn = document.getElementById("doctorBtn");
    const loginForm = document.getElementById("loginForm");
    const passwordField = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    // Role Selection Logic
    patientBtn.onclick = function() {
        role = "patient";
        patientBtn.classList.add("active");
        doctorBtn.classList.remove("active");
    };

    doctorBtn.onclick = function() {
        role = "doctor";
        doctorBtn.classList.add("active");
        patientBtn.classList.remove("active");
    };

    // Form Submission Logic
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const usernameValue = document.getElementById("username").value;
        const passwordValue = passwordField.value;

        const submitBtn = e.target.querySelector('input[type="submit"]');
        const originalBtnValue = submitBtn.value;
        submitBtn.value = "Loading...";
        submitBtn.disabled = true;

        try {
            const finalLoginUrl = `${API_BASE_URL}/login`;
            // alert("Connecting to: " + finalLoginUrl); // टेस्ट झाल्यावर हे कमेंट करू शकता

            const res = await fetch(finalLoginUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameValue,
                    password: passwordValue,
                    role: role
                })
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // ✅ Android/Capacitor साठी रिडायरेक्शन पाथ
                if (data.user.role === "doctor") {
                    window.location.href = "doctor/dashboard.html";
                } else {
                    window.location.href = "HOME/index.html";
                }
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.error("Connection Error:", err);
            alert("Server not reachable ❌ \nBackend Railway वर चालू आहे का तपासा!");
        } finally {
            submitBtn.value = originalBtnValue;
            submitBtn.disabled = false;
        }
    });

    if (togglePassword) {
        togglePassword.onclick = function() {
            passwordField.type = passwordField.type === "password" ? "text" : "password";
        };
    }
});