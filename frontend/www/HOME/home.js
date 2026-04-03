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

// Capacitor App Plugin वापरून बॅक बटण कंट्रोल करणे
import { App } from '@capacitor/app';

App.addListener('backButton', ({ canGoBack }) => {
    const currentPath = window.location.pathname;

    // १. जर युजर होम पेज किंवा लॉगिन पेजवर असेल, तर ॲप बंद करा
    if (currentPath.includes('index.html') || currentPath.includes('login.html') || currentPath.includes('dashboard.html')) {
        App.exitApp();
    } 
    // २. जर मागे जाण्यासारखी 'History' असेल, तर फक्त मागे जा
    else if (canGoBack) {
        window.history.back();
    } 
    // ३. जर काहीच नसेल, तर सरळ होम पेजवर पाठवा (बाहेर न काढता)
    else {
        window.location.href = "../HOME/index.html"; 
    }
});