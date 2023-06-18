let loadMore = document.querySelector("#load-more");
let max = 6;

// COUNTER
let a = 0;
$(document).ready(function () {
  $(".count").each(function () {
    let $this = $(this);
    jQuery({ Counter: 0 }).animate(
      { Counter: $this.text() },
      {
        duration: 2000,
        easing: "swing",
        step: function () {
          $this.text(Math.ceil(this.Counter));
        },
      }
    );
  });
  a = 1;
});

let dataArr = [];
let copyArr = [];
let sortedArr = [];
let tBody = document.querySelector("tbody");
let count = 0;
const BASE_URL = "http://localhost:8080";
function drawTabele(arr) {
  tBody.innerHTML = "";
  arr.forEach((item) => {
    tBody.innerHTML += `
    
    <tr>
    <td>${++count}</td>
    <td><img src="${item.img}" alt=""></td>
    <td>${item.movieName}</td>
    <td>${item.genres}</td>
    <td>
   ${item.title.split(" ").slice(0, 3).concat("...").join(" ")}
    </td>
    <td>${item.imbd}</td>
    <td>${item.time}</td>
    <td>


      <i class="fa-solid fa-eye btn btn-success" onclick=showMoreDetails(${
        item.id
      })></i>
      <a class="fa-solid fa-pen-to-square btn btn-secondary" href="add-movies.html?id=${
        item.id
      }"></a>
      <i class="fa-solid fa-trash btn btn-danger" onclick=deleteMovies(${
        item.id
      }) id=${item.id}></i>
    </td>
  </tr>
    
    `;
  });
}
// GETDATA
let searchInp = document.querySelector(".search");
async function getAllData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  dataArr = resp.data;
  copyArr = searchInp.value ? copyArr : resp.data;
  // filterMovies()
  drawTabele(copyArr.slice(0, max));
}
getAllData();

// SEARCH
searchInp.addEventListener("input", function (e) {
  copyArr = dataArr;
  copyArr = copyArr.filter((item) =>
    item.movieName
      .toLocaleLowerCase()
      .includes(e.target.value.toLocaleLowerCase())
  );
  sortedArr=copyArr
  drawTabele(copyArr.slice(0, max));
});

// DELETE
async function deleteMovies(moviesId) {
  await axios.delete(`${BASE_URL}/allMovies/${moviesId}`);

  document.querySelector(`#${moviesId}`).closest("tr").remove();
}

// MORE DETAILS
function showMoreDetails(userId) {
  console.log(userId);
  let findFilm = copyArr.find((item) => item.id == userId);
  let modalBody = document.getElementById("userModalBody");
  modalBody.innerHTML = `
          <div class="img"><img src="${findFilm.img}"></div>
          <div class="content">
          <h5 class="text-center title">${findFilm.movieName}</h5>
          <p><strong>Title: </strong> ${findFilm.title}</p>
          <p><strong>Release-Date: </strong>${findFilm.releaseDate}</p>
          <p><strong>Genres: </strong>${findFilm.genres}</p>
          <p><strong>Time: </strong>${findFilm.time}</p>
          <p><strong>Imbd: </strong>${findFilm.imbd}</p>
          </div>


       
          `;
  let userModal = new bootstrap.Modal(document.getElementById("userModal"));
  userModal.show();
  let closeModalBtn = document.getElementById("closeModalBtn");
  closeModalBtn.addEventListener("click", function () {
    userModal.hide();
  });
}

// SORT

let dropdown = document.querySelector(".sortDrop");
dropdown.addEventListener("click", function (event) {
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
  drawTabele(copyArr.slice(0, max));
}
sortMovies();

// FILTER
let dropdownGenres = document.querySelector(".genres-dropdown");
dropdownGenres.addEventListener("click", function (event) {
  let target = event.target;
  if (target.classList.contains("dropdown-item")) {
    filterMovies(target.innerText);
  }
});
function filterMovies(genresMovies) {
  copyArr = dataArr;
  if (genresMovies === "All") {
    drawTabele(copyArr);
  } else {
    copyArr = copyArr.filter((item) => item.genres.includes(genresMovies));
    drawTabele(copyArr);
  }
 sortedArr=copyArr
}

filterMovies();
loadMore.addEventListener("click", function () {
  max = max + 6;
  if (max >= copyArr.length) {
    loadMore.style.display = "none";
  }
  if (sortedArr.length) {
    drawTabele(sortedArr.slice(0, max));
  } else {
    getAllData();
  }
});
