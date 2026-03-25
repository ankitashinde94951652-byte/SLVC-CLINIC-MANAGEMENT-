(function(){

const user = JSON.parse(localStorage.getItem("user"));

if(!user){
alert("Please login first");
window.location.href="../login/login.html";
}

const isDoctor = user.role === "doctor";

if(!isDoctor){
document.querySelectorAll(".doctor-only").forEach(btn=>{
btn.style.display="none";
});
}

const GRID=document.getElementById("grid");
const TPL=document.getElementById("cardTpl");

const PREV=document.getElementById("prevBtn");
const NEXT=document.getElementById("nextBtn");
const PAGEINFO=document.getElementById("pageInfo");

const PAGE_SIZE=4;

let page=1;
let stories=[];

function parseYouTubeId(url){

if(!url) return null;

try{

const u=new URL(url);

if(u.hostname.includes("youtu.be"))
return u.pathname.slice(1);

if(u.hostname.includes("youtube.com"))
return u.searchParams.get("v");

}catch(e){}

return null;

}

async function loadStories(){

try{

const res=await fetch("http://10.0.2.2:5000/api/stories");

const data=await res.json();

/* important fix */

stories=data.data || data;

render();

}catch(err){

console.log("Load error",err);

}

}

function formatPageInfo(){

const total=Math.max(1,Math.ceil(stories.length/PAGE_SIZE));

PAGEINFO.textContent=`Page ${page} of ${total}`;

PREV.disabled=page<=1;
NEXT.disabled=page>=total;

}

function render(){

GRID.innerHTML="";

formatPageInfo();

const start=(page-1)*PAGE_SIZE;

const slice=stories.slice(start,start+PAGE_SIZE);

if(slice.length===0){

GRID.innerHTML="<p>No stories available</p>";

return;

}

slice.forEach(s=>{

const node=TPL.content.cloneNode(true);

const article=node.querySelector("article");
const thumb=node.querySelector(".thumb");
const pname=node.querySelector(".pname");
const pdisease=node.querySelector(".pdisease");
const preview=node.querySelector(".preview");
const delBtn=node.querySelector(".deleteBtn");

pname.textContent=s.name || "Unnamed";

pdisease.textContent=s.disease || "";

preview.textContent=(s.story_text || "").slice(0,120);

/* IMAGE */

if(s.photo_url){

const img=document.createElement("img");

img.src=s.photo_url;

thumb.appendChild(img);

}

/* YOUTUBE */

else if(s.youtube_url){

const yt=document.createElement("img");

yt.src=`https://img.youtube.com/vi/${parseYouTubeId(s.youtube_url)}/hqdefault.jpg`;

thumb.appendChild(yt);

}

/* hide delete for patient */

if(!isDoctor){
delBtn.style.display="none";
}

/* DELETE */

delBtn.addEventListener("click",async(e)=>{

e.stopPropagation();

if(!confirm("Delete story?")) return;

await fetch(`http://10.0.2.2:5000/api/stories/${s.id}`,{
method:"DELETE"
});

loadStories();

});

/* OPEN STORY */

article.addEventListener("click",(e)=>{

if(e.target.classList.contains("deleteBtn")) return;

window.location.href=`sss.html?id=${s.id}`;

});

GRID.appendChild(node);

});

}

PREV.onclick=()=>{

if(page>1){
page--;
render();
}

};

NEXT.onclick=()=>{

const total=Math.ceil(stories.length/PAGE_SIZE);

if(page<total){
page++;
render();
}

};

loadStories();

})();