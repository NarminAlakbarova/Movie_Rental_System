let premiumRow = document.querySelector(".premium-row");
let purchasedMovie = document.querySelector(".cards");
let searchInpPrem = document.querySelector(".search");
let dropdownPrem = document.querySelector(".sortDrop");
let allPremiumMovies = JSON.parse(localStorage.getItem("premiumMovies")) || [];
let purchasedMovies = JSON.parse(localStorage.getItem("myMovies")) || [];
let basketCount2 = document.querySelector(".basket-count");

let dataArr = [];
let copyArr = [];
let sortedArr = [];
const BASE_URL = "http://localhost:8080";

// DRAW ROW
function drawPremRow(arr) {
  premiumRow.innerHTML = "";
  arr.forEach((item) => {
    premiumRow.innerHTML += `
        
        
        <div class="col-md-12 col-sm-12 my-3">
        <div class="movie-list">
          <div class="listing-container">
            <div class="listing-img">
              <div class="img">
                <div class="overlay"></div>
                <img
                  src="${item.img.length > 100 ? item.img : item.img.slice(1)}"
                  alt=""
                />
              </div>
            </div>
            <div class="listing-content">
              <div class="info">
                <h2>${item.movieName}</h2>
                <p>
                ${item.title}
                </p>
              </div>
              <p>Price: ${item.price}$</p>
              <div class="top-btn">
                <a onclick=addBasket(${item.id})>
                  <i class="fa-solid fa-basket-shopping" ></i>
                </a>
              </div>
              <div class="bottom-btn">
                <div class="icons" style="--rating: ${+item.imbd}">
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        `;
  });
}

// GETDATA
async function getAllPremiumData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  dataArr = resp.data;
  dataArr = dataArr.filter((item) => item.section == "Premium");
  copyArr = searchInpPrem.value ? copyArr : dataArr;
  drawPremRow(copyArr);
}
getAllPremiumData();

// SEARCH
searchInpPrem.addEventListener("input", function (e) {
  copyArr = dataArr;
  copyArr = copyArr.filter((item) =>
    item.movieName
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  drawPremRow(copyArr);
});

// SORT
dropdownPrem.addEventListener("click", function (e) {
  let target = e.target;
  e.preventDefault();
  if (target.classList.contains("dropdown-item")) {
    sortMovies(target.innerText);
  }
});

function sortMovies(sortType) {
  if (sortType === "Default") {
    copyArr = dataArr;
  } else if (sortType === "imdb rated- highest") {
    copyArr = copyArr.toSorted((a, b) => b.imbd - a.imbd);
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
  drawPremRow(copyArr);
}
sortMovies();

//   FILTER CATIGORIES
let premUl = document.querySelector(".prem-ul");
premUl.addEventListener("click", function (e) {
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
  drawPremRow(copyArr);
}

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

// ADD BASKET
async function addBasket(moviId) {
  let selectedObj = copyArr.find((item) => item.id == moviId);
  let resp = await axios("http://localhost:8080/users");
  let data = resp.data;
  let checkUser = data.find((user) => user.check === true);
  if (!checkUser) {
    showAlert("Please Sign in", "info");
  } else if (!allPremiumMovies.includes(selectedObj) && checkUser) {
    let premiumMovies = copyArr.find((obj) => obj.id === moviId);
    allPremiumMovies.push(premiumMovies);
    localStorage.setItem("premiumMovies", JSON.stringify(allPremiumMovies));

    showAlert("Added", "info");
   
    basketCounter2();
  } else if (allPremiumMovies.includes(selectedObj)) {

    showAlert("This movie alredy added basket", "info");
  }
}
function basketCounter2() {
  let counter = allPremiumMovies.length;
  if (basketCount2) {
    basketCount2.innerHTML = counter.toString();
  }
}
basketCounter2();
// GET PURCHASEDMOVIES
function getPurchasedMovies() {
  purchasedMovie.innerHTML = "";
  purchasedMovies.forEach((item) => {
    purchasedMovie.innerHTML += `
    
    <div class="card my-3">
    <div class="img-content">
     
      <img src="${item.img}" alt="" />
      <div class="content">
        <h5>${item.movieName}</h5>
        <p>${item.title.split(" ").slice(0, 3).concat("...").join(" ")}</p>
      </div>
      <div class="play">
        <a href="details.html?id=${item.id}" class="fa-solid fa-play"></a>
      </div>
    </div>
  </div>
    
    
    `;
  });
}
getPurchasedMovies();
