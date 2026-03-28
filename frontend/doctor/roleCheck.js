document.addEventListener("DOMContentLoaded", function(){

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please login first");
window.location.href="login/login.html";
return;
}

/* PATIENT RESTRICTIONS */

if(user.role === "patient"){

/* hide doctor menu items */

const doctorElements = document.querySelectorAll(".doctor-only");

doctorElements.forEach(el=>{
el.style.display="none";
});

}

/* DOCTOR RESTRICTIONS */

if(user.role !== "doctor"){

const doctorPages = document.querySelectorAll(".doctor-page");

if(doctorPages.length>0){

alert("Doctor access only");

window.location.href="HOME/index.html";

}

}

});