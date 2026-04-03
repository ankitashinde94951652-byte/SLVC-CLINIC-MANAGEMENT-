console.log("EDIT JS LOADED ✅");

const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "patient") {
  alert("Access denied");
  window.location.href = "HOME/index.html";
}

const id = user.id;

/* LOAD DATA */
async function load() {
    try {
        const res = await fetch("https://slvc-clinic-management-production.up.railway.app/api/patients/" + id);
        const p = await res.json();

        console.log("PATIENT:", p);

        document.getElementById("name").value = p.name || user.username || "";
        document.getElementById("age").value = p.age || "";
        document.getElementById("gender").value = p.gender || "Male";
        document.getElementById("phone").value = p.phone || "";
        document.getElementById("history").value = p.medicalHistory || "";
        document.getElementById("life").value = p.lifestyle || "";

    } catch (err) {
        console.log("LOAD ERROR:", err);
    }
}

load();


/* SAVE PROFILE */
async function save() {

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const history = document.getElementById("history").value;
    const life = document.getElementById("life").value;

    const photoInput = document.getElementById("photoFile");

    const formData = new FormData();

    formData.append("name", name);
    formData.append("age", age);
    formData.append("gender", gender);
    formData.append("phone", phone);
    formData.append("medicalHistory", history);
    formData.append("lifestyle", life);

    if (photoInput.files.length > 0) {
        formData.append("photo", photoInput.files[0]);
    }

    try {
        const res = await fetch("https://slvc-clinic-management-production.up.railway.app/api/patients/" + id, {
            method: "PUT",
            body: formData
        });

        const data = await res.json();

        console.log("SAVE RESPONSE:", data);

        if (data.success) {
            alert("Profile Saved ✅");
            window.location.href = "profile.html";
        } else {
            alert("Error: " + (data.error || "Unknown"));
        }

    } catch (err) {
        console.log("SAVE ERROR:", err);
        alert("Network Error ❌");
    }
}