const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "../login/login.html";
}

const id = user.id;

// function editProfile() {
//   window.location.href = "edit.html";
// }

// function addPrescription() {
//   window.location.href = "addPrescription.html?id=" + id;
// }

// function viewPrescriptions() {
//   window.location.href = "viewPrescription.html?id=" + id;
// }


async function loadPatient() {

  try {

    const res = await fetch(
      "https://slvc-clinic-management-production.up.railway.app/api/patients/" + id
    );

    const p = await res.json();

    document.getElementById("name").innerText = p.name || user.username;
    document.getElementById("age").innerText = "Age : " + (p.age || "-");
    document.getElementById("gender").innerText = "Gender : " + (p.gender || "-");
    document.getElementById("history").innerText = p.medicalHistory || "-";
    document.getElementById("life").innerText = p.lifestyle || "-";

    // ✅ FIXED IMAGE PATH
    if (p.photo) {
      document.getElementById("photo").src =
        "https://slvc-clinic-management-production.up.railway.app" + p.photo;
    }

  } catch (err) {
    console.log(err);
    document.getElementById("name").innerText = "Profile Load Error";
  }

}

loadPatient();