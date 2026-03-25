const user = JSON.parse(localStorage.getItem("user"));

if(!user || user.role !== "doctor"){

alert("Doctor access only");

window.location.href="../HOME/index.html";

}


const notesListDiv = document.getElementById("notesList");

async function loadNotes(){

const res = await fetch("http://10.0.2.2:5000/api/notes");

const data = await res.json();

const notes = data.data;

notesListDiv.innerHTML="";

if(notes.length===0){

notesListDiv.innerHTML="<p>No notes available 📭</p>";

return;

}

notes.forEach((note,index)=>{

notesListDiv.innerHTML+=`

<div class="note-card">

<p><strong>Note ${index+1}</strong></p>

<p>${note.note}</p>

${note.notedate ? `<p><small>Date: ${note.notedate}</small></p>`:""}

<button onclick="editNote(${note.nid})" 
style="background:green;color:white;border:none;padding:6px 12px;border-radius:6px;">
Edit
</button>

<button onclick="deleteNote(${note.nid})" 
style="background:red;color:white;border:none;padding:6px 12px;border-radius:6px;">
Delete
</button>
</div>

`;

});

}


function editNote(id){

localStorage.setItem("editNoteId",id);

window.location.href="notes.html";

}


async function deleteNote(id){

if(!confirm("Delete note?")) return;

await fetch(`http://10.0.2.2:5000/api/notes/${id}`,{
method:"DELETE"
});

loadNotes();

}


loadNotes();

notes.forEach((note,index)=>{

notesListDiv.innerHTML+=`

<div class="note-card">

<p><strong>Note ${index+1}</strong></p>

<p>${note.note}</p>

${note.notedate ? `<p><small>Date: ${note.notedate}</small></p>`:""}

<div class="btn-row">

<button class="edit-btn" onclick="editNote(${note.nid})">Edit</button>

<button class="delete-btn" onclick="deleteNote(${note.nid})">Delete</button>

</div>

</div>

`;

});