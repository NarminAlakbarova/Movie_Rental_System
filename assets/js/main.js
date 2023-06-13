let burgerMenu = document.querySelector("#burger-menu");
let markIcon = document.querySelector(".fa-xmark");
let menuIcon = document.querySelector(".fa-bars");
let header = document.querySelector("header");
let searchInp = document.querySelector(".search-input");
let searchIcon = document.querySelector(".fa-search");
let cards = document.querySelectorAll(".card");

menuIcon.addEventListener("click", function () {
  burgerMenu.classList.toggle("show");
});
markIcon.addEventListener("click", function () {
  burgerMenu.classList.toggle("show");
});

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

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => {
      if (c !== card) {
        c.classList.remove("active");
      }
    });

    card.classList.add("active");
  });
});
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});
var swiper = new Swiper(".lastSwipper", {
  initialSlide: 1,
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
// POPUP
let modals = document.querySelectorAll(".modal");
let imgs = document.querySelectorAll(".myImg");
let closeBtns = document.querySelectorAll(".close");

imgs.forEach((img, index) => {
  img.onclick = function () {
    modals[index].style.display = "block";
  };
});

closeBtns.forEach((closeBtn, index) => {
  closeBtn.addEventListener("click", function () {
    modals[index].style.display = "none";
  });
});
// let imgDetails = document.querySelector(".right-content");
// let modalDetails = document.querySelector(".modal-details");
// let closeBtnsDetails = document.querySelector(".close-details");

// imgDetails.addEventListener("click", function () {
//   modalDetails.style.display = "block";
// });

// closeBtnsDetails.addEventListener("click", function () {
//   console.log("hh");
//   modalDetails.style.display = "none ";
// });


let dropdown = document.querySelector(".dropdown");

dropdown.addEventListener("mouseenter", function () {
  dropdown.setAttribute("data-bs-toggle", "");
  dropdown.removeAttribute("aria-expanded");
});

dropdown.addEventListener("mouseleave", function () {
  dropdown.setAttribute("data-bs-toggle", "dropdown");
  dropdown.setAttribute("aria-expanded", "false");
});

let userIcon=document.querySelector(".fa-user")
let userMenu=document.querySelector(".sing-in-up ")
userIcon.addEventListener("click",function(){
  console.log("jsj");
  userMenu.classList.toggle("active")
})




let descriptionLink=document.querySelector(".description-link")
let rateReviewLink=document.querySelector(".rate-review-link")
let rateReviewSection=document.querySelector("#rate-review")
let descriptionSection=document.querySelector("#description")
rateReviewLink.addEventListener("click",function(){
rateReviewSection.style.display="block"

descriptionSection.style.display="none"

})
descriptionLink.addEventListener("click",function(){
  rateReviewSection.style.display="none"
  descriptionSection.style.display="block"
})

