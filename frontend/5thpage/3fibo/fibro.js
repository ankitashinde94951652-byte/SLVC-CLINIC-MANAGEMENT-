
function toggleMenu(){
  const menu = document.getElementById("menu");
  if(menu.style.right === "20px"){
    menu.style.right = "-280px";
  } else {
    menu.style.right = "20px";
  }
}


  function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    const menu = document.getElementById("menu");
    const icon = document.querySelector(".menu-icon");
    if (!menu.contains(e.target) && !icon.contains(e.target)) {
      menu.style.display = "none";
    }
  });
