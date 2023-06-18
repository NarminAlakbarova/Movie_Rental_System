let burgerMenu = document.querySelector("#burger-menu");
let markIcon = document.querySelector(".fa-xmark");
let menuIcon = document.querySelector(".fa-bars");
let header = document.querySelector("header");
let searchInp = document.querySelector(".search-input");
let searchIcon = document.querySelector(".fa-search");
let dropdown = document.querySelector(".dropdown");

// DROPDOWN
dropdown.addEventListener("mouseenter", function () {
  dropdown.setAttribute("data-bs-toggle", "");
  dropdown.removeAttribute("aria-expanded");
});

dropdown.addEventListener("mouseleave", function () {
  dropdown.setAttribute("data-bs-toggle", "dropdown");
  dropdown.setAttribute("aria-expanded", "false");
});

let userIcon = document.querySelector(".fa-user");
let userMenu = document.querySelector(".sing-in-up ");
userIcon.addEventListener("click", function () {
  console.log("jsj");
  userMenu.classList.toggle("active");
});
// BURGER MENU
menuIcon.addEventListener("click", function () {
  burgerMenu.classList.toggle("show");
});
markIcon.addEventListener("click", function () {
  burgerMenu.classList.toggle("show");
});

//   SCROLL
function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    header.style.background = "#141414";
  } else {
    header.style.background = "";
  }
}
window.addEventListener("scroll", scrollFunction);
searchIcon.addEventListener("click", function () {
  searchInp.classList.toggle("show-inp");
});

// BACT TO TOP
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#scroll").fadeIn();
    } else {
      $("#scroll").fadeOut();
    }
  });
  $("#scroll").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});
