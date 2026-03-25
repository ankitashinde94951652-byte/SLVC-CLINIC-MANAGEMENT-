const noteArea = document.getElementById("noteArea");
const reminderDate = document.getElementById("reminderDate");

const editId = localStorage.getItem("editNoteId");


/* LOAD NOTE FOR EDIT */

if(editId){

fetch(`http://10.0.2.2:5000/api/notes/${editId}`)

.then(res=>res.json())

.then(data=>{

noteArea.value = data.data.note;
reminderDate.value = data.data.notedate || "";

});

}


/* SAVE NOTE */

async function saveNote(){

const note = noteArea.value.trim();
const notedate = reminderDate.value;

if(note===""){

alert("Please write a note");
return;

}

let url="http://10.0.2.2:5000/api/notes/create";
let method="POST";

if(editId){

url=`http://10.0.2.2:5000/api/notes/${editId}`;
method="PUT";

}

const response = await fetch(url,{

method:method,

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

note:note,
notedate:notedate

})

});

const data = await response.json();

if(data.success){

alert("Note saved successfully");

localStorage.removeItem("editNoteId");

window.location.href="main.html";

}

}