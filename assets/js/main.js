let allMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
const BASE_URL = "http://localhost:8080";
let suggestedSlide = document.querySelector(".suggested-slide");
let upcomingCards = document.querySelector(".upcoming-row");
let mustHaveRow = document.querySelector(".must-have-row");
let trailerRow = document.querySelector(".trailer-row");
let premiumSlider = document.querySelector(".premium-slider");
let heroCarusel = document.querySelector(".hero-carusel-item");
let allData = [];

// SCROLL REVEAL ANIMATION
ScrollReveal().reveal(".best-movie-col", {
  duration: 2000,
  origin: "left",
  distance: "50px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});
ScrollReveal().reveal(".img-col", {
  duration: 2000,
  origin: "right",
  distance: "50px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});

// SWIPPER SLIDE
let swiper = new Swiper(".mySwiper", {
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
let swiper2 = new Swiper(".lastSwipper", {
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

async function copyData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  let data = resp.data;
  allData = data;

}

// SUGGESTED SECTION JS

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
    <img src="${item.img.length > 100 ? item.img : item.img.slice(1)}" alt="" />
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
  drawSuggestedSlide(filteredData);
}

getSuggestedData();

// ADD MY LIST

function showAlert(alerttext, infoalert) {
  Toastify({
    text: alerttext,
    className: infoalert,
    style: {
      background: "linear-gradient(to right, #222221, #b00000 )",
    },
  }).showToast();
}
async function addMyList(movieId) {
  let selectedMovie = await axios(`${BASE_URL}/allMovies/${movieId}`);
  let selectedMovieData = selectedMovie.data;
  let resp = await axios("http://localhost:8080/users");
  let data = resp.data;
  let checkUser = data.find((user) => user.check === true);
  let checkMovie = allMovies.some((movie) => movie.id == selectedMovieData.id);
  if (!checkUser) {
    showAlert("Please Sign in", "info");
  } else if (checkMovie) {
    showAlert("This movie alredy added my-list", "info");
  } else if (!checkMovie && checkUser) {
    let favMovie = selectedMovieData;
    allMovies.push(favMovie);
    localStorage.setItem("favMovies", JSON.stringify(allMovies));
    showAlert("Added", "info");
  }
}

// UPCOMING

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
  await copyData();
  allData = allData.filter((item) => item.section === "upcoming");
  drawUpcomingCards(allData.slice(0, 6));
}
getUpcomingFilms();

// Must-Have js
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
                          <a href="details.html?id=${item.id}">${
      item.movieName
    }</a>
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
}
getTrailerData();

async function showTrailer(element, itemId) {
  let resp = await axios(`http://localhost:8080/allMovies/${itemId}`);
  let data = resp.data;

  if (data) {
    let modal = element.querySelector(".modal");
    let iframe = modal.querySelector("iframe");
    iframe.src = data.trailer;
    modal.style.display = "block";
    // modal.style.visibility = "visible";
  }
}

function closeModal(element) {
  let modal = element.closest("div");
  if (modal) {
    let iframe = modal.querySelector("iframe");
    iframe.src = "";
    modal.style.display = "none";
    modal.style.visibility = "hidden";
  }
}

// PREMIUM JS

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
  await copyData();
  allData = allData.filter((item) => item.section === "Premium");
  drawPremiumMovies(allData);
}
getPremiumFilms();

// HERO-SECTION JS

function drawHeroSection(arr) {
  heroCarusel.innerHTML = "";
  arr.forEach((item) => {
    heroCarusel.innerHTML += `
    
    <div class="carousel-item active">
    <div class="opacity-slide"></div>
    <div class="modal2">
    <span class="close" onclick="closeModalHero(this)" >&times;</span>
    <div class="modal-content">
      <iframe width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    </div>
  </div>
    <img
      src="${item.img.length > 100 ? item.img : item.img.slice(1)}"
      class="d-block w-100"
      alt="..."
    />

  
  
    <div class="carousel-caption">
      <div class="container">
        <div class="row carusel-content">
          <div class="col-lg-7 col-sm-12 content-left">
            <div class="first-title">${item.movieName}</div>
            <div class="info-film">
              <div class="imdb">
                <h4>${item.imbd}</h4>
                <img
                  src="./assets/img/imdb-film-director-computer-icons-television-u-b9ac4bbc964b1399dc797db594cf699a.png"
                  alt=""
                />
              </div>
              <div id="gp">
                <div class="gp">GP</div>
                <p>${item.time}</p>
              </div>
            </div>
            <p>
            ${item.title}
            </p>
            <p class="starring">
              <span> Starring </span>
              Karen Gilchrist, James Earl Jones
            </p>
            <p class="genres">
              <span> Genres </span>
              ${item.genres}
            </p>
            <p class="tags">
              <span> Tags </span>
              Action, Adventures, Horror
            </p>
            <a class="play-now" href="details.html?id=${item.id}">
              <i class="fa-solid fa-play"></i>
              Play Now
            </a>
          </div>

          <div
            class="col-lg-5 col-sm-12 my-5 content-right"
          >
          <a onclick="showHeroTrailer(this.parentElement, '${item.id}')">
          <i class="fa-solid fa-play"></i>
        </a>
    <div class="trailer-title">
    <p>Watch Trailer</p>
    
    </div>
        
          </div>
        </div>
      </div>
    </div>
  </div>
    
    
    `;
  });
}
async function getHeroData() {
  await copyData();
  allData = allData.filter((item) => item.section === "Hero-Banner");
  drawHeroSection(allData);
}
getHeroData();

async function showHeroTrailer(element, itemId) {
  let resp = await axios(`http://localhost:8080/allMovies/${itemId}`);
  let data = resp.data;
  if (data) {
    let modal = element.closest(".carousel-item").querySelector(".modal2");
    let iframe = modal.querySelector("iframe");
    iframe.src = data.trailer;
    modal.style.display = "block";
    modal.style.visibility = "visible";
  }
}
function closeModalHero(element) {
  let modal = element.closest(".modal2");
  if (modal) {
    let iframe = modal.querySelector("iframe");
    iframe.src = "";
    modal.style.display = "none";
    modal.style.visibility = "hidden";
  }
}
