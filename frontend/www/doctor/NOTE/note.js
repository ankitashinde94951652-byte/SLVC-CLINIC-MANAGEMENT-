console.log("JS LOADED ✅");

/* GET ELEMENTS AFTER PAGE LOAD */
document.addEventListener("DOMContentLoaded", () => {

    const noteArea = document.getElementById("noteArea");
    const reminderDate = document.getElementById("reminderDate");

    /* MAKE FUNCTION GLOBAL */
    window.saveNote = async function () {

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

            console.log("API RESPONSE:", data);

            if (data.success) {
                alert("Saved to DB ✅");
            } else {
                alert("Error: " + data.message);
            }

        } catch (err) {
            console.error("ERROR:", err);
            alert("Network error ❌");
        }
    };

});