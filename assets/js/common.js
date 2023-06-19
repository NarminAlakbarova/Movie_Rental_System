// let burgerMenu = document.querySelector("#burger-menu");
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

// FIND USER
let userNameSpan = document.querySelector(".user-name");
const USER_URL = "http://localhost:8080";
function drawUserName(obj) {
  userNameSpan.innerHTML = "";
  userNameSpan.innerHTML = `${obj ? obj.userName : ''}`;
}

async function findUser() {
  let resp = await axios(`${USER_URL}/users`);
  let data = resp.data;
  console.log(data);
  let user = data.find((item) => item.check === true);
  console.log(user);
  drawUserName(user);
}
findUser();
// BURGET MENU
const burgerMenu = document.getElementById("burger-menu");
jQuery(document).ready(function () {
  var body = jQuery(document.body);
  var button = jQuery("svg");
  var line = jQuery("line");

  button.click(function () {
    if (jQuery(document.body).hasClass("menu-open")) {
      body.removeClass("menu-open");
      burgerMenu.classList.remove("show");

      return;
    }
    burgerMenu.classList.add("show");
    body.addClass("menu-open");
  });
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

// LOG-OUT 

let logOutIcon = document.querySelector(".log-out");
logOutIcon.addEventListener("click", async function () {
  let resp = await axios(`${USER_URL}/users`);

  let data = resp.data;
  let users = data.find((user) => user.check === true);
  console.log(users);
  await axios.patch(`http://localhost:8080/users/${users.id}`, {
    check: false,
  });
  localStorage.clear();
});

let allPremiumMovies2 = JSON.parse(localStorage.getItem("premiumMovies")) || [];
let basketCount = document.querySelector(".basket-count");
console.log(allPremiumMovies2);

function basketCounter() {

  let counter = allPremiumMovies2.length;
  console.log(counter);
  if (basketCount) {
    basketCount.innerHTML = counter.toString();
    console.log(counter);
  }
}

basketCounter();

// SPINNER
let spinner = document.querySelector(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    spinner.style.display = "none";
  }, 200);
});
