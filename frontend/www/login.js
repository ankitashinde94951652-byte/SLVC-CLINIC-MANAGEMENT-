// ✅ हा नवीन कोड वापरा (Railway URL सह)
const API_BASE_URL = (
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1" || 
    window.location.hostname === "" || 
    window.location.protocol === "file:"
) 
? "https://slvc-clinic-management-production.up.railway.app/api"  // 👈 इथे तुझा रेल्वे URL टाकला आहे
: "https://slvc-clinic-management-production.up.railway.app/api"; // 👈 सर्व ठिकाणी हाच चालावा म्हणून


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

        // Button state handle kara
        const submitBtn = e.target.querySelector('input[type="submit"]');
        const originalBtnValue = submitBtn.value;
        submitBtn.value = "Loading...";
        submitBtn.disabled = true;

        try {
            // ✅ DEBUG ALERT: Emulator madhe konta URL hit hotoय te disel
            const finalLoginUrl = `${API_BASE_URL}/login`;
            alert("Connecting to: " + finalLoginUrl);

            const res = await fetch(finalLoginUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: usernameValue,
                    password: passwordValue,
                    role: role
                })
            });

            // // Status check (404, 500 etc)
            // if (!res.ok) {
            //     const errorData = await res.json();
            //     throw new Error(errorData.message || "Server Error");
            // }

            const data = await res.json();
            console.log("Server Response:", data);

            if (data.success) {
                // Store session data
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect based on role
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
            alert("Server not reachable ❌ \nURL: " + API_BASE_URL + "\nBackend chalu aahe ka check kara!");
        } finally {
            // Reset button state
            submitBtn.value = originalBtnValue;
            submitBtn.disabled = false;
        }
    });

    // Password Visibility Toggle
    if (togglePassword) {
        togglePassword.onclick = function() {
            passwordField.type = passwordField.type === "password" ? "text" : "password";
        };
    }
});