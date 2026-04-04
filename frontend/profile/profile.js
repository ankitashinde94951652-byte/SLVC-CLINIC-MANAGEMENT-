const user = JSON.parse(localStorage.getItem("user")) || {
  id: 1,
  username: "ankita_shinde",
  role: "patient"
};

// 🔴 IMPORTANT FIX
// if (!user || !user.id) {
//   alert("Login required");
//   window.location.href = "../login/login.html";
// }

const id = user.id;

// ✅ BUTTON FUNCTIONS (WORKING)
function editProfile() {
  window.location.href = "edit.html";
}

function addPrescription() {
  window.location.href = "addPrescription.html?id=" + id;
}

function viewPrescriptions() {
  window.location.href = "viewPrescription.html?id=" + id;
}

// ✅ LOAD PROFILE
async function loadPatient() {
  try {
    const res = await fetch(
      "https://slvc-clinic-management-production.up.railway.app/api/patients/" + id
    );

    const p = await res.json();

    document.getElementById("name").innerText =
      p.name || user.username || "No Name";

    document.getElementById("age").innerText =
      p.age ? "Age : " + p.age : "Age : -";

    document.getElementById("gender").innerText =
      p.gender ? "Gender : " + p.gender : "Gender : -";

    document.getElementById("history").innerText =
      p.medicalHistory || "-";

    document.getElementById("life").innerText =
      p.lifestyle || "-";

    if (p.photo && p.photo !== "null") {
  document.getElementById("photo").src =
    "https://slvc-clinic-management-production.up.railway.app" + p.photo;
} else {
  document.getElementById("photo").src =
    "https://via.placeholder.com/90";
}

  } catch (err) {
    console.log("PROFILE ERROR:", err);
  }
}

loadPatient();