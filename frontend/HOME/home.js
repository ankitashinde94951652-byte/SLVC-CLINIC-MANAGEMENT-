const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please login first");
window.location.href="login page/login.html";
}

/* PATIENT VIEW */

if(user.role==="patient"){

document.getElementById("notesMenu").style.display="none";
document.getElementById("storiesMenu").style.display="none";
document.getElementById("calendarMenu").style.display="none";
document.getElementById("surgeryMenu").style.display="none";

}

/* DOCTOR VIEW */

if(user.role==="doctor"){

document.getElementById("profileMenu").style.display="none";
document.getElementById("appointmentMenu").style.display="none";

return;

}

if(user.role==="patient"){

window.location.href="profile/profile.html?id="+user.id;

}

else{

alert("Doctor does not have profile page");

}




// APPOINTMENT CLICK
function openAppointment(){

if(!user){

alert("Login required");

window.location.href="login/login.html";

return;

}

if(user.role==="patient"){

window.location.href="appoinm/book.html";

}

else{

window.location.href="doctor/calendar.html";

}

}


// LOGOUT
function logout(){

localStorage.removeItem("user");

localStorage.removeItem("token");

window.location.href="login/login.html";

}