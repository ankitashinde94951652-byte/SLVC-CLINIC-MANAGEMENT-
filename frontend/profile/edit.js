const user = JSON.parse(localStorage.getItem("user")) || {
  id: 1,
  username: "ankita_shinde",
  role: "patient"
};

// if (!user || !user.id) {
//   alert("Login required");
//   window.location.href = "../login/login.html";
// }

const id = user.id;

// LOAD DATA
async function load() {
  try {
    const res = await fetch(
      "https://slvc-clinic-management-production.up.railway.app/api/patients/" + id
    );

    const p = await res.json();

    document.getElementById("name").value = p.name || "";
    document.getElementById("age").value = p.age || "";
    document.getElementById("gender").value = p.gender || "";
    document.getElementById("phone").value = p.phone || "";
    document.getElementById("history").value = p.medicalHistory || "";
    document.getElementById("life").value = p.lifestyle || "";

  } catch (err) {
    console.log("LOAD ERROR:", err);
  }
}

load();

// SAVE PROFILE
async function save() {
  try {
    const formData = new FormData();

    formData.append("name", document.getElementById("name").value);
    formData.append("age", document.getElementById("age").value);
    formData.append("gender", document.getElementById("gender").value);
    formData.append("phone", document.getElementById("phone").value);
    formData.append("medicalHistory", document.getElementById("history").value);
    formData.append("lifestyle", document.getElementById("life").value);

    const photo = document.getElementById("photoFile").files[0];
    if (photo) formData.append("photo", photo);

    const res = await fetch(
      "https://slvc-clinic-management-production.up.railway.app/api/patients/" + id,
      {
        method: "PUT",
        body: formData
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Profile Saved ✅");
      window.location.href = "profile.html";
    } else {
      alert("Error: " + data.error);
    }

  } catch (err) {
    console.log("SAVE ERROR:", err);
    alert("Save failed ❌");
  }
}