document.addEventListener("DOMContentLoaded", () => {

  const dateInput = document.getElementById("date");
  const slotSelect = document.getElementById("slot");

  const slots = [
    { id:401, time:"05:00 PM - 05:30 PM" },
    { id:402, time:"05:30 PM - 06:00 PM" },
    { id:403, time:"06:00 PM - 06:30 PM" },
    { id:404, time:"06:30 PM - 07:00 PM" },
    { id:405, time:"07:00 PM - 07:30 PM" },
    { id:406, time:"07:30 PM - 08:00 PM" },
    { id:407, time:"08:00 PM - 08:30 PM" },
    { id:408, time:"08:30 PM - 09:00 PM" }
  ];

  function loadSlots(){

    slotSelect.innerHTML = '<option value="">Select Slot</option>';

    slots.forEach(slot => {

      const option = document.createElement("option");

      option.value = slot.id;
      option.textContent = slot.time;
      option.dataset.time = slot.time;

      slotSelect.appendChild(option);

    });

  }

  if(dateInput){
    dateInput.addEventListener("change", loadSlots);
  }

});


/* ================= CONFIRM APPOINTMENT ================= */

async function confirmAppointment() {

  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const address = document.getElementById("address").value.trim();
  const date = document.getElementById("date").value;
  const reference = document.getElementById("reference").value;

  const slotSelect = document.getElementById("slot");
  const slotId = slotSelect.value;

  const slotTime = slotSelect.options[slotSelect.selectedIndex].dataset.time;

  if (!name || !mobile || !date || !slotId) {
    alert("Please fill all required fields!");
    return;
  }

  try {

    const time = slotTime.split(" - ")[0];
    const appointmentTime = date + " " + convertTo24Hour(time);

    const response = await fetch("http://10.0.2.2:5000/api/appointments", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({

        ptid: 1,
        pt_name: name,
        phone: mobile,
        app_time: appointmentTime,
        reason: reference,
        slot_id: slotId,
        reference: reference,
        address: address

      })

    });

    const data = await response.json();

    if (data.success) {

      /* ✅ USER NAME SAVE */
      localStorage.setItem("patientName", name);

      alert("Appointment booked successfully!");

      window.location.href = "next.html";

    } else {

      alert(data.message);

    }

  } catch (error) {

    console.error(error);
    alert("Server connection error");

  }

}


/* TIME FORMAT FIX */

function convertTo24Hour(time12h) {

  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}:00`;

}