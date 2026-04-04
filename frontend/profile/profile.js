const user = JSON.parse(localStorage.getItem("user")) || {};

const id = user.id || 1; // fallback id

function editProfile() {
  window.location.href = "edit.html";
}

function addPrescription() {
  window.location.href = "addPrescription.html?id=" + id;
}

function viewPrescriptions() {
  window.location.href = "viewPrescription.html?id=" + id;
}

async function loadPatient() {
  try {
    const res = await fetch(
      "https://slvc-clinic-management-production.up.railway.app/api/patients/" + id
    );

    const p = await res.json();

    // ✅ fallback default values
    document.getElementById("name").innerText =
      p.name || user.username || "Ankita Shinde";

    document.getElementById("age").innerText =
      p.age ? "Age : " + p.age : "Age : 21";

    document.getElementById("gender").innerText =
      p.gender ? "Gender : " + p.gender : "Gender : Female";

    document.getElementById("history").innerText =
      p.medicalHistory || "No major issues";

    document.getElementById("life").innerText =
      p.lifestyle || "Healthy lifestyle";

    // ✅ PHOTO FIX
    if (p.photo && p.photo !== "null") {
      document.getElementById("photo").src =
        "https://slvc-clinic-management-production.up.railway.app" + p.photo;
    } else {
      document.getElementById("photo").src =
        "https://via.placeholder.com/90";
    }

  } catch (err) {
    console.log("ERROR:", err);

    // ✅ अगर API fail झाला तरी default दाखव
    document.getElementById("name").innerText = "Ankita Shinde";
    document.getElementById("age").innerText = "Age : 21";
    document.getElementById("gender").innerText = "Gender : Female";
    document.getElementById("history").innerText = "No major issues";
    document.getElementById("life").innerText = "Healthy lifestyle";
  }
}

loadPatient();