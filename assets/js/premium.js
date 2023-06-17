let premiumRow = document.querySelector(".premium-row");
let purchasedMovie=document.querySelector(".cards")
let allPremiumMovies = JSON.parse(localStorage.getItem("premiumMovies")) || [];
let purchasedMovies=JSON.parse(localStorage.getItem("myMovies"))||[]

let dataArr = [];
let copyArr = [];
let sortedArr = [];
const BASE_URL = "http://localhost:8080";

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
let searchInpPrem = document.querySelector(".search");

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

let dropdownPrem = document.querySelector(".sortDrop");
dropdownPrem.addEventListener("click", function (event) {
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
  drawPremRow(copyArr);
}
sortMovies();

//   FILTER CATIGORIES
let premUl = document.querySelector(".prem-ul");
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
  drawPremRow(copyArr);
}

// ADD BASKET
async function addBasket(moviId) {
  console.log("jj");
  let selectedObj = copyArr.find((item) => item.id == moviId);
  let resp = await axios("http://localhost:8080/users");
  let data = resp.data;
  let checkUser = data.find((user) => user.check === true);
  if (!checkUser) {
    alert("please sign in");
  } else if (!allPremiumMovies.includes(selectedObj) && checkUser) {
    let premiumMovies = copyArr.find((obj) => obj.id === moviId);
    allPremiumMovies.push(premiumMovies);
    localStorage.setItem("premiumMovies", JSON.stringify(allPremiumMovies));
    alert("yes")
  } else if (allPremiumMovies.includes(selectedObj)) {
    alert("no");
  }
}


function getPurchasedMovies(){
  purchasedMovie.innerHTML=""
  purchasedMovies.forEach((item)=>{
    purchasedMovie.innerHTML+=`
    
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
    
    
    `
  })
}
getPurchasedMovies()