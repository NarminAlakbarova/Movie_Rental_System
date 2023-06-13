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

let userIcon = document.querySelector(".fa-user");
let userMenu = document.querySelector(".sing-in-up ");
userIcon.addEventListener("click", function () {
  console.log("jsj");
  userMenu.classList.toggle("active");
});

// let descriptionLink = document.querySelector(".description-link");
// let rateReviewLink = document.querySelector(".rate-review-link");
// let rateReviewSection = document.querySelector("#rate-review");
// let descriptionSection = document.querySelector("#description");
// rateReviewLink.addEventListener("click", function () {
//   rateReviewSection.style.display = "block";

//   descriptionSection.style.display = "none";
// });
// descriptionLink.addEventListener("click", function () {
//   rateReviewSection.style.display = "none";
//   descriptionSection.style.display = "block";
// });
let allData = [];
const BASE_URL = "http://localhost:8080";

async function copyData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  let data = resp.data;
  allData = data;
  console.log(allData);
}

copyData();

// SUGGESTED SECTION JS

let suggestedSlide = document.querySelector(".suggested-slide");

function drawSuggestedSlide(arr) {
  suggestedSlide.innerHTML = "";
  arr.forEach((item) => {
    suggestedSlide.innerHTML += `
      <div class="swiper-slide">
        <div class="card">
          <div class="overlay">
            <div class="overlay-content">
              <a class="fa-solid fa-cart-shopping"></a>
              <a class="fa-regular fa-heart"></a>
              <a class="fa-solid fa-play"></a>
              <a class="fa-solid fa-plus"></a>
            </div>
          </div>
          <img src="${item.img}" alt="" />
          <div class="title">
            <h2>${item.movieName}</h2>
            <p>${item.time}</p>
          </div>
        </div>
      </div>
    `;
  });
}

 async function getSuggestedData() {
  await copyData()
  let filteredData = allData.filter((item) => item.section === "Suggested");
  console.log(allData);
  drawSuggestedSlide(filteredData);
}

getSuggestedData();


// Umcoming section js

let upcomingCards = document.querySelector(".upcoming-row");

function drawUpcomingCards(arr) {
  upcomingCards.innerHTML = "";
  arr.forEach((item) => {
    upcomingCards.innerHTML += `
    
    <div class="col-lg-4 col-md-6 col-sm-6 my-2">
    <div class="card left-cards">
      <div class="img">
        <img src="${item.img}" alt="" />
      </div>
      <div class="content">
        <h4>${item.movieName}</h4>
        <p>${item.genres}</p>
      </div>
      <div class="play-overlay">
        <a>
          <i class="fa-solid fa-play"></i>
        </a>
      </div>
      <div class="star-time">
        <div class="star">
          <i class="fa-solid fa-star"></i>
          <p>${item.imbd}</p>
        </div>
        <p class="time">${item.releaseDate.split(",").slice(1).join("")}</p>
      </div>
    </div>
  </div>
    
    
    `;
  });
}

async function getUpcomingFilms() {
  // let resp = await axios(`${BASE_URL}/allMovies`);
  // let data = resp.data;
  await copyData()
  allData = allData.filter((item) => item.section === "upcoming");
  drawUpcomingCards(allData.slice(0,6));
}
getUpcomingFilms();

// Most-Have js
let mostHaveRow = document.querySelector(".most-have-row");
function drawMostHaveRow(arr) {
  mostHaveRow.innerHTML = "";
  arr.forEach((item) => {
    mostHaveRow.innerHTML += `
    
         <div class="col-lg-12 my-2">
                  <div class="card right-cards">
                    <div class="right-all-content">
                      <div class="img">
                        <img
                          src="${item.img}"
                          alt=""
                        />
                      </div>
                      <div class="right-content">
                        <p>${item.movieName}</p>
                        <div class="star-icon">
                          <i class="fa-solid fa-star"></i>
                          <p>${item.imbd}</p>
                          <p style="color: #7777">${item.releaseDate
                            .split(",")
                            .slice(1)
                            .join("")}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    `;
  });
}
async function getMostHaveSeries(){
  await copyData()
  allData=allData.filter(item=>item.section==="most-have")
  drawMostHaveRow(allData)
}
getMostHaveSeries()


// TRAILER JS
let trailerRow = document.querySelector(".trailer-row");

function drawTrailerRow(arr) {
  trailerRow.innerHTML = "";
  arr.forEach((item) => {
    trailerRow.innerHTML += `
      <div class="col-lg-2 col-md-3 col-sm-4 col-6">
        <div class="cards">
          <div class="img">
            <img src="${item.img}" alt="" class="myImg" />

            <div class="modal">
              <span class="close">&times;</span>
              <div class="modal-content">
                <iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div>
            </div>
          </div>
          <div class="trailer-content">
            <h5>${item.movieName}</h5>
            <p>Season: ${item.season}</p>
          </div>
        </div>
      </div>
    `;
  });
}

async function getTrailerData() {
  await copyData();
  let filteredData = allData.filter((item) => item.section === "trailer");
  drawTrailerRow(filteredData);
  populateModalData()
}
getTrailerData()

async function populateModalData() {
  await copyData()
  let filteredData = allData.filter((item) => item.section === "trailer");

  let modals = document.querySelectorAll(".modal");
  modals.forEach((modal, index) => {
    let iframe = modal.querySelector("iframe");
    iframe.src = filteredData[index].trailer;
  });
}

trailerRow.addEventListener("click", function (event) {
  if (event.target.classList.contains("myImg")) {
    let modal = event.target.parentNode.querySelector(".modal");
    modal.style.display = "block";
  }
  if (event.target.classList.contains("close")) {
    let modal = event.target.closest(".modal");
    let iframe = modal.querySelector("iframe");

    // Pause the video
    iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    modal.style.display = "none";
  }
});

