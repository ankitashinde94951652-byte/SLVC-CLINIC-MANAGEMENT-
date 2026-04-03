alert("JS LOADED ✅"); // 👈 MUST show

const noteArea = document.getElementById("noteArea");
const reminderDate = document.getElementById("reminderDate");

async function saveNote() {

    const note = noteArea.value.trim();
    const notedate = reminderDate.value;

    if (!note) {
        alert("Enter note");
        return;
    }

    try {
        const response = await fetch("https://slvc-clinic-management-production.up.railway.app/api/notes/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                note: note,
                notedate: notedate
            })
        });

        const data = await response.json();

        console.log(data);

        if (data.success) {
            alert("Saved to DB ✅");
        } else {
            alert("Error");
        }

    } catch (e) {
        alert("Network error ❌");
        console.error(e);
    }
}