// let patients = [];
// let currentPage = 1;
// const itemsPerPage = 4;

// function openPopup() {
//     document.getElementById("popup").style.display = "flex";
// }

// function closePopup() {
//     document.getElementById("popup").style.display = "none";
// }

// function savePatient() {
//     let name = document.getElementById("pname").value.trim();
//     let problem = document.getElementById("pproblem").value.trim();
//     let beforeFile = document.getElementById("beforePhoto").files[0];
//     let afterFile = document.getElementById("afterPhoto").files[0];

//     if (!name || !problem || !beforeFile || !afterFile) {
//         alert("Please fill all fields with photos!");
//         return;
//     }

//     let reader1 = new FileReader();
//     let reader2 = new FileReader();

//     reader1.onload = function(e1) {
//         reader2.onload = function(e2) {

//             patients.push({
//                 name: name,
//                 date: new Date().toLocaleDateString(),
//                 problem: problem,
//                 before: e1.target.result,
//                 after: e2.target.result
//             });

//             closePopup();
//             loadPatients();
//         }
//         reader2.readAsDataURL(afterFile);
//     }
//     reader1.readAsDataURL(beforeFile);
// }

// function loadPatients() {
//     let list = document.getElementById("patient-list");
//     list.innerHTML = "";

//     let start = (currentPage - 1) * itemsPerPage;
//     let end = start + itemsPerPage;

//     let pageItems = patients.slice(start, end);

//     pageItems.forEach((p, i) => {
//         list.innerHTML += `
//         <div class="patient-card">
//             <div class="patient-top">
//                 <div>
//                     <h3>${p.name}</h3>
//                     <small>${p.date}</small>
//                 </div>
//                 <button class="delete-btn" onclick="deletePatient(${start + i})">Delete</button>
//             </div>
//             <div class="photos">
//                 <img src="${p.before}">
//                 <img src="${p.after}">
//             </div>
//             <p class="problem">${p.problem}</p>
//         </div>`;
//     });

//     document.getElementById("page-number").innerText = currentPage;
// }

// function deletePatient(index) {
//     patients.splice(index, 1);
//     loadPatients();
// }

// function nextPage() {
//     if (currentPage * itemsPerPage < patients.length) {
//         currentPage++;
//         loadPatients();
//     }
// }

// function prevPage() {
//     if (currentPage > 1) {
//         currentPage--;
//         loadPatients();
//     }
// }

// loadPatients();
