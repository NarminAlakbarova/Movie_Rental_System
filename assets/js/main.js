let cards = document.querySelectorAll(".card");
let logOutIcon = document.querySelector(".log-out");
// let userId = new URLSearchParams(window.location.search).get("id");

let allMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
//

// Scroll Reveal
// ScrollReveal().reveal(".content-left", {
//   duration: 2000,
//   origin: "left",
//   distance: "100px",
//   easing: "cubic-bezier(.37,.01,.74,1)",
//   opacity: 0.3,
//   scale: 0.5,
// });

// ScrollReveal().reveal(".content-right", {
//   duration: 2000,
//   origin: "right",
//   distance: "100px",
//   easing: "cubic-bezier(.37,.01,.74,1)",
//   opacity:0.3,
// });
ScrollReveal().reveal(".best-movie-col", {
  duration: 2000,
  origin: "left",
  distance: "100px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});
ScrollReveal().reveal(".img-col", {
  duration: 2000,
  origin: "right",
  distance: "100px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
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

let allData = [];
const BASE_URL = "http://localhost:8080";

async function copyData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  let data = resp.data;
  allData = data;
  // console.log(allData);
}

// copyData();

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
             
              
              <a class="fa-solid fa-play" href="details.html?id=${item.id}"></a>
              <a class="fa-solid fa-plus" onclick=addMyList(${item.id})></a>
            </div>
          </div>
          <img src="${
            item.img.length > 100 ? item.img : item.img.slice(1)
          }" alt="" />
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
  await copyData();
  let filteredData = allData.filter((item) => item.section === "Suggested");
  // console.log(allData);
  drawSuggestedSlide(filteredData);
}

getSuggestedData();

// async function addMyList(movieId) {
//   // console.log(id);
//   let selectedObj = allMovies.find((item) => item.id == movieId);
//   // console.log(selectedObj);
//   // console.log(selectedObj.id);
//   let resp = await axios("http://localhost:8080/users");
//   let data = resp.data;
//   let checkUser = data.find((user) => user.check === true);

//   allMovies.includes(selectedObj);

//   if (!checkUser) {
//     alert("please sign in ");
//   } else if (!allMovies.includes(selectedObj) && checkUser) {
//     let favMovies = allData.find((obj) => obj.id === movieId);
//     allMovies.push(favMovies);
//     localStorage.setItem("favMovies", JSON.stringify(allMovies));
//   } else if (allMovies.includes(selectedObj)) {
//     alert("no");
//   }
// }

// Umcoming section js

async function addMyList(movieId) {
  console.log(allData);

  let selectedMovie = await axios(`${BASE_URL}/allMovies/${movieId}`);
  let selectedMovieData = selectedMovie.data;
  console.log(selectedMovieData);

  let resp = await axios("http://localhost:8080/users");
  let data = resp.data;
  let checkUser = data.find((user) => user.check === true);
  let checkMovie=allMovies.some((movie) => movie.id == selectedMovieData.id)
  console.log(checkMovie);
  if (!checkUser) {
    alert("Please sign in");
  }
  else if (checkMovie) {
    alert("Movie is already in the list");
  }
  else if (!checkMovie && checkUser) {
    let favMovie = selectedMovieData;
    allMovies.push(favMovie);
    localStorage.setItem("favMovies", JSON.stringify(allMovies));
    alert("Movie added successfully");
  }
}



// UPCOMING
let upcomingCards = document.querySelector(".upcoming-row");

function drawUpcomingCards(arr) {
  upcomingCards.innerHTML = "";
  arr.forEach((item) => {
    upcomingCards.innerHTML += `
    
    <div class="col-lg-4 col-md-6 col-sm-6 my-2">
    <div class="card left-cards">
      <div class="img">
        <img src="${
          item.img.length > 100 ? item.img : item.img.slice(1)
        }" alt="" />
      </div>
      <div class="content">
        <h4>${item.movieName}</h4>
        <p>${item.genres}</p>
      </div>
      <div class="play-overlay">
        <a href="details.html?id=${item.id}">
        
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
  await copyData();
  allData = allData.filter((item) => item.section === "upcoming");
  drawUpcomingCards(allData.slice(0, 6));
}
getUpcomingFilms();

// Must-Have js
let mustHaveRow = document.querySelector(".must-have-row");
function drawMostHaveRow(arr) {
  mustHaveRow.innerHTML = "";
  arr.forEach((item) => {
    mustHaveRow.innerHTML += `
    
         <div class="col-lg-12 my-2">
                  <div class="card right-cards">
                    <div class="right-all-content">
                      <div class="img">
                        <img
                          src="${
                            item.img.length > 100 ? item.img : item.img.slice(1)
                          }"
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
async function getMostHaveSeries() {
  await copyData();
  allData = allData.filter((item) => item.section === "Must-Have");
  drawMostHaveRow(allData);
}
getMostHaveSeries();

// TRAILER JS
let trailerRow = document.querySelector(".trailer-row");

function drawTrailerRow(arr) {
  trailerRow.innerHTML = "";
  arr.forEach((item) => {
    trailerRow.innerHTML += `
      <div class="col-lg-2 col-md-3 col-sm-4 col-6">
        <div class="cards " onclick="showTrailer(this, '${item.id}')">
          <div class="img">
            <img src="${
              item.img.length > 100 ? item.img : item.img.slice(1)
            }" alt="" class="myImg" />

            <div class="modal">
              <span class="close" onclick="closeModal(this)" >&times;</span>
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
  // populateModalData();
}
getTrailerData();

async function showTrailer(element, itemId) {
  let resp = await axios(`http://localhost:8080/allMovies/${itemId}`);
  let data = resp.data;

  if (data) {
    let modal = element.querySelector(".modal");
    let iframe = modal.querySelector("iframe");

    // Set the trailer URL for the iframe
    iframe.src = data.trailer;

    modal.style.display = "block";
  }
}
// function outsideClickHandler(event) {
//   let modal = document.querySelector(".modal");
//   if (!modal.contains(event.target)) {
//     closeModal(modal.querySelector(".close"));
//   }
// }
// function closeModal(closeElement) {
//   let modal = closeElement.closest(".modal");
//   let iframe = modal.querySelector("iframe");

//   // Pause the video
//   iframe.contentWindow.postMessage(
//     '{"event":"command","func":"pauseVideo","args":"" }',
//     "*"
//   );

//   modal.style.display = "none";
//   modal.parentNode.classList.remove("modal-open"); // Modal kapatıldığında "modal-open" sınıfını kaldırın
// }
// function closeModal(closeElement) {
//   let modal = closeElement.closest(".modal");
//   let iframe = modal.querySelector("iframe");

//   // Pause the video
//   iframe.contentWindow.postMessage(
//     '{"event":"command","func":"pauseVideo","args":"" }',
//     "*"
//   );

//   modal.style.display = "none";
// }

// async function populateModalData() {
//   await copyData();
//   let filteredData = allData.filter((item) => item.section === "trailer");

//   let modals = document.querySelectorAll(".modal");
//   modals.forEach((modal, index) => {
//     let iframe = modal.querySelector("iframe");
//     iframe.src = filteredData[index].trailer;
//   });
// }
// async function populateModalData() {
//   if (allData.length === 0) {
//     await copyData();
//   }

//   let filteredData = allData.filter((item) => item.section === "trailer");

//   let modals = document.querySelectorAll(".modal");
//   modals.forEach((modal, index) => {
//     let iframe = modal.querySelector("iframe");
//     iframe.src = filteredData[index].trailer;
//   });
// }
// populateModalData()
// let trailerCard=document.querySelector(".trailer-cards")
// trailerCard.addEventListener("click", function (event) {
//   if (event.target.classList.contains("myImg")) {
//     let modal = event.target.parentNode.querySelector(".modal");
//     modal.style.display = "block";
//   }
//   if (event.target.classList.contains("close")) {
//     let modal = event.target.closest(".modal");
//     let iframe = modal.querySelector("iframe");

//     // Pause the video
//     iframe.contentWindow.postMessage(
//       '{"event":"command","func":"pauseVideo","args":"" }',
//       "*"
//     );
//     modal.style.display = "none";
//   }
// });
async function getTrailer(id) {
  let resp = await axios(`${BASE_URL}/allMovies/${id}`);
  let data = resp.data;

  console.log(data);
}

// PREMIUM JS
let premiumSlider = document.querySelector(".premium-slider");

function drawPremiumMovies(arr) {
  premiumSlider.innerHTML = "";
  arr.forEach((item) => {
    premiumSlider.innerHTML += `
    <div class="swiper-slide">
    <div class="overlay"></div>
    <img src="${item.img.length > 100 ? item.img : item.img.slice(1)}" />
    <div class="slider-content">
      <div class="gender">
        <p class="action">${item.genres}</p>
        <p class="adventures">Adventures</p>
      </div>
      <div class="first-title">${item.movieName}</div>
      <div class="info-film">
        <div class="imdb">
          <p>${item.imbd}</p>
          <img
            src="./assets/img/imdb-film-director-computer-icons-television-u-b9ac4bbc964b1399dc797db594cf699a.png"
            alt=""
          />
        </div>
        <div id="gp">
          <div class="gp">GP</div>
          <p>2hr:22mins</p>
        </div>
      </div>
      <p class="info">
  ${item.title}
      </p>
      <p class="starring">
        <span> Starring </span>
        Karen Gilchrist, James Earl Jones
      </p>

      <p class="tags">
        <span> Tags </span>
        Action, Adventures, Horror
      </p>
      <p class="price">
        <span> Price </span>
       ${item.price}
      </p>
      <a class="play-now" href="premium.html">
        <i class="fa-solid fa-play"></i>
        Play Now
      </a>
    </div>
  </div>
    `;
  });
}

async function getPremiumFilms() {
  // let resp = await axios(`${BASE_URL}/allMovies`);
  // let data = resp.data;
  await copyData();
  allData = allData.filter((item) => item.section === "Premium");
  // console.log(allData);
  drawPremiumMovies(allData);
}
getPremiumFilms();

// console.log(userId);
logOutIcon.addEventListener("click", async function () {
  let resp = await axios("http://localhost:8080/users");
  let data = resp.data;
  let users = data.find((user) => user.check === true);
  console.log(users);
  await axios.patch(`http://localhost:8080/users/${users.id}`, {
    check: false,
  });
  localStorage.clear();

});
