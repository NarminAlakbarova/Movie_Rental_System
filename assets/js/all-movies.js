let row = document.querySelector(".all-movies-cards");
let loadMore = document.querySelector("#load");
let dropdownAll = document.querySelector(".sortDrop");
let premUl = document.querySelector(".all-genres-ul");
let searchInpMovies = document.querySelector(".search");
let allMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
const BASE_URL = "http://localhost:8080";
let dataArr = [];
let copyArr = [];
let sortedArr = [];
let max = 8;

// DRAW ROW
function drawRow(arr) {
  row.innerHTML = "";
  arr.forEach((item) => {
    row.innerHTML += `
    <div class="col-lg-3 col-md-4 col-sm-6 my-3">
    <div class="card">
      <img src="${
        item.img.length > 100 ? item.img : item.img.slice(1)
      }" alt="" />
      <div class="overlay">
        <div class="card-content">
          <div class="rating">
            <i class="fa-solid fa-star"></i>
            ${item.imbd}
          </div>
          <h4>${item.movieName}</h4>
          <p>${item.genres}</p>
        </div>
      </div>
      <div class="icons">

        <div>
          <a class="fa-solid fa-plus" onclick=addMyList(${item.id}) ></a>
        </div>
        <div>
          <a href="details.html?id=${item.id}" class="fa-solid fa-play" ></a>
        </div>
      </div>
    </div>
  </div>
    
    `;
  });
}
//GET DATA
async function getAllData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  dataArr = resp.data;
  copyArr = searchInp.value ? copyArr : dataArr;
  drawRow(copyArr.slice(0, max));
}
getAllData();

// SEARCH
searchInpMovies.addEventListener("input", function (e) {
  copyArr = dataArr;
  copyArr = copyArr.filter((item) =>
    item.movieName
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  sortedArr = copyArr;
  drawRow(copyArr.slice(0, max));
});

// LOAD MORE
loadMore.addEventListener("click", function () {
  max = max + 8;
  if (max >= copyArr.length) {
    loadMore.style.display = "none";
  }
  if (sortedArr.length) {
    drawRow(sortedArr.slice(0, max));
  } else {
    getAllData();
  }
});

// SORT
dropdownAll.addEventListener("click", function (event) {
  console.log("hello");
  event.preventDefault();
  let target = event.target;
  if (target.classList.contains("dropdown-item")) {
    sortMovies(target.innerText);
  }
});

function sortMovies(sortType) {
  if (sortType === "Default") {
    copyArr = dataArr;
  } else if (sortType === "imdb rated- highest") {
    copyArr = copyArr.toSorted((a, b) => b.imbd - a.imbd);
    console.log("nn");
  } else if (sortType === "imdb rated - lowest") {
    copyArr = copyArr.toSorted((a, b) => a.imbd - b.imbd);
  } else if (sortType === "A-Z") {
    copyArr = copyArr.toSorted((a, b) =>
      a.movieName.localeCompare(b.movieName)
    );
  } else if (sortType === "Z-A") {
    copyArr = copyArr.toSorted((a, b) =>
      b.movieName.localeCompare(a.movieName)
    );
  }
  sortedArr = copyArr;
  drawRow(copyArr.slice(0, max));
}
sortMovies();

// filter
premUl.addEventListener("click", function (e) {
  console.log(e);
  if (e.target.tagName === "A") {
    e.preventDefault();
    var genre = e.target.innerHTML.trim();
    filterByGenre(genre);
  }
});

function filterByGenre(genre) {
  if (genre === "All") {
    copyArr = dataArr;
  } else {
    copyArr = dataArr.filter((item) => item.genres.includes(genre));
  }
  sortedArr = copyArr;
  drawRow(copyArr.slice(0, max));
}

// VIDEO CARDS
let videoCard = [...document.querySelectorAll(".video-card")];
videoCard.forEach((item) => {
  item.addEventListener("mouseover", () => {
    let video = item.children[1];
    video.play();
  });
  item.addEventListener("mouseleave", () => {
    let video = item.children[1];
    video.pause();
  });
});

// ALERT
function showAlert(alerttext, infoalert) {
  Toastify({
    text: alerttext,
    className: infoalert,
    style: {
      background: "linear-gradient(to right, #222221, #b00000 )",
    },
  }).showToast();
}

// ADD MY-LIST
async function addMyList(movieId) {
  let selectedMovie = await axios(`${BASE_URL}/allMovies/${movieId}`);
  let selectedMovieData = selectedMovie.data;
  console.log(selectedMovieData);
  let resp = await axios("http://localhost:8080/users");
  let data = resp.data;
  let checkUser = data.find((user) => user.check === true);
  let checkMovie = allMovies.some((movie) => movie.id == selectedMovieData.id);
  console.log(checkMovie);
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
