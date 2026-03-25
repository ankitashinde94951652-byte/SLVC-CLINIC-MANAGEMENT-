console.log("JS CONNECTED");

const items = document.querySelectorAll('.item');
const container = document.querySelector('.circle-container');

const radius = 200;
const center = 250;

items.forEach((item, i) => {
  const angle = (i / items.length) * 2 * Math.PI;
  item.style.left = center + radius * Math.cos(angle) - 50 + "px";
  item.style.top  = center + radius * Math.sin(angle) - 50 + "px";
});


function toggleMenu() {
  const menu = document.getElementById("menu");

  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}
