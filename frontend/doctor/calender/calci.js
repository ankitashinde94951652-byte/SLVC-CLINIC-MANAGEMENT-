const calendar=document.getElementById("calendar");
const appointmentList=document.getElementById("appointments");
const selectedDateText=document.getElementById("selectedDate");

let today=new Date();
let currentMonth=today.getMonth();
let currentYear=today.getFullYear();
let selectedDate=null;

let appointmentData=[];


// LOAD APPOINTMENTS
async function loadAppointments(){

const res=await fetch("http://10.0.2.2:5000/api/appointments");
const result=await res.json();

appointmentData=result.data;

renderMonth();
generateCalendar();

}

loadAppointments();


// MONTH NAME
function renderMonth(){

const monthNames=[
"January","February","March","April","May",
"June","July","August","September",
"October","November","December"
];

document.getElementById("monthName").innerText=
monthNames[currentMonth]+" "+currentYear;

}


// DAYS
function daysInMonth(month,year){
return new Date(year,month+1,0).getDate();
}


// GENERATE CALENDAR
function generateCalendar(){

calendar.innerHTML="";

const totalDays=daysInMonth(currentMonth,currentYear);

for(let i=1;i<=totalDays;i++){

const day=document.createElement("div");
day.classList.add("day");
day.innerText=i;

const hasAppointment=appointmentData.some(a=>{

const d=new Date(a.app_time);

return(
d.getFullYear()==currentYear &&
d.getMonth()==currentMonth &&
d.getDate()==i
);

});

if(hasAppointment){

const dot=document.createElement("div");
dot.classList.add("dot");
day.appendChild(dot);

}

day.onclick=()=>selectDate(i);

calendar.appendChild(day);

}

}


// SELECT DATE
function selectDate(date){

selectedDate=date;

selectedDateText.innerText=
`Appointments on ${date}/${currentMonth+1}/${currentYear}`;

showAppointments();

}


// SHOW APPOINTMENTS
function showAppointments(){

appointmentList.innerHTML="";

const selected=appointmentData.filter(a=>{

const d=new Date(a.app_time);

return(
d.getFullYear()==currentYear &&
d.getMonth()==currentMonth &&
d.getDate()==selectedDate
);

});

if(selected.length==0){

appointmentList.innerHTML="No appointments";
return;

}

selected.forEach(a=>{

appointmentList.innerHTML+=`

<div style="margin-bottom:10px">

<strong>${new Date(a.app_time).toLocaleTimeString()}</strong>

<br>

Patient : ${a.pt_name}

<br>

Status : ${a.status}

</div>

`;

});

}


// NEXT MONTH
function nextMonth(){

currentMonth++;

if(currentMonth>11){
currentMonth=0;
currentYear++;
}

renderMonth();
generateCalendar();

}


// PREV MONTH
function prevMonth(){

currentMonth--;

if(currentMonth<0){
currentMonth=11;
currentYear--;
}

renderMonth();
generateCalendar();

}