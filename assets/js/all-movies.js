let swiper = new Swiper(".all-movies-swipper", {
  pagination: {
    el: ".swiper-pagination",
  },
});

let row = document.querySelector(".all-movies-cards");
let loadMore = document.querySelector("#load");
let dataArr = [];
let copyArr = [];
let sortedArr = [];
let max = 8;
const BASE_URL = "http://localhost:8080";
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
          <a class="fa-solid fa-plus"></a>
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

async function getAllData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  dataArr = resp.data;
  copyArr = searchInp.value ? copyArr : dataArr;
  // filterMovies()
  drawRow(copyArr.slice(0, max));
}
getAllData();
let searchInpMovies = document.querySelector(".search");
searchInpMovies.addEventListener("input", function (e) {
  copyArr = dataArr;
  copyArr = copyArr.filter((item) =>
    item.movieName
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  sortedArr=copyArr
  drawRow(copyArr.slice(0, max));
});
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

// sort
let dropdownAll = document.querySelector(".sortDrop");
dropdownAll.addEventListener("click", function (event) {
  console.log("hello");
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
  drawRow(copyArr.slice(0,max));
}
sortMovies();

// filter
let premUl = document.querySelector(".all-genres-ul");
premUl.addEventListener("click", function (event) {
  if (event.target.tagName === "A") {
    event.preventDefault();
    var genre = event.target.textContent.trim();
    filterByGenre(genre);
  }
});

function filterByGenre(genre) {
  if (genre === "All") {
    copyArr = dataArr;
  } else {
    copyArr = dataArr.filter((item) => item.genres.includes(genre));
  }
  sortedArr=copyArr
  drawRow(copyArr.slice(0,max));
}

