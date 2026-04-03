const user = JSON.parse(localStorage.getItem("user"));

if (!user || user.role !== "patient") {
  alert("Access denied");
  window.location.href = "HOME/index.html";
}

const id = user.id;

async function load() {
    try {
        const res = await fetch("https://slvc-clinic-management-production.up.railway.app/api/patients/" + id);
        const p = await res.json();

        // show data safely
        document.getElementById("name").value = p.name != null ? p.name : (user.username || "");
        document.getElementById("age").value = p.age != null ? p.age : "";
        document.getElementById("gender").value = p.gender != null ? p.gender : "";
        document.getElementById("phone").value = p.phone != null ? p.phone : "";
        document.getElementById("history").value = p.medicalHistory != null ? p.medicalHistory : "";
        document.getElementById("life").value = p.lifestyle != null ? p.lifestyle : "";

        // set photo preview if exists
        if (p.photo) {
            document.getElementById("photoFile").previousElementSibling?.setAttribute("src", "https://slvc-clinic-management-production.up.railway.app/api" + p.photo);
        }

    } catch (err) {
        console.log(err);
    }
}
load();

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

    const res = await fetch("https://slvc-clinic-management-production.up.railway.app/api/patients/" + id, {
      method: "PUT",
      body: formData
    });

    const data = await res.json();

    if (data.success) {
      alert("Profile Saved ✅");
      // Reload profile page to show updated data
      window.location.href = "profile.html";
    } else {
      alert("Save failed: " + (data.error || "Unknown error"));
    }

  } catch (err) {
    console.log(err);
    alert("Save error");
  }
}