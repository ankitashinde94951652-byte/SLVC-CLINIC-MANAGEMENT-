const noteArea = document.getElementById("noteArea");
const reminderDate = document.getElementById("reminderDate");

const editId = localStorage.getItem("editNoteId");

/* LOAD NOTE */
if (editId) {
    fetch(`https://slvc-clinic-management-production.up.railway.app/api/notes/${editId}`)
    .then(res => res.json())
    .then(data => {
        console.log("Loaded Note:", data);

        noteArea.value = data.data.note;
        reminderDate.value = data.data.notedate || "";
    })
    .catch(err => console.error("Load Error:", err));
}

/* SAVE NOTE */
async function saveNote() {

    const note = noteArea.value.trim();
    const notedate = reminderDate.value;

    if (!note) {
        alert("Please write a note");
        return;
    }

    let url = "https://slvc-clinic-management-production.up.railway.app/api/notes/create";
    let method = "POST";

    if (editId) {
        url = `https://slvc-clinic-management-production.up.railway.app/api/notes/${editId}`;
        method = "PUT";
    }

    try {
        const response = await fetch(url, {
            method: method,
            mode: "cors",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                note: note,
                notedate: notedate
            })
        });

        const data = await response.json();

        console.log("Note API:", data);

        if (response.ok && data.success) {
            alert("Note saved successfully ✅");
            localStorage.removeItem("editNoteId");
            window.location.href = "main.html";
        } else {
            alert("Error: " + (data.message || "Unknown"));
        }

    } catch (err) {
        console.error("Note Error:", err);
        alert("Network error ⚠️");
    }
}