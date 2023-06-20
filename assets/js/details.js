const BASE_URL = "http://localhost:8080";
let movieId = new URLSearchParams(window.location.search).get("id");
let allMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
let descriptionLink = document.querySelector(".description-link");
let rateReviewLink = document.querySelector(".rate-review-link");
let descriptionSection = document.querySelector("#description");
let rateReviewSection = document.querySelector("#rate-review");
let commentsRow = document.querySelector(".comments-row");
let form = document.querySelector("form");
let video = document.querySelector(".films-video");
let detailsRow = document.querySelector(".details-row");
let userNameInp = document.querySelector(".username-inp");
let emailInp = document.querySelector(".email-inp");
let textArea = document.querySelector("textarea");
let description = document.querySelector(".description");
let recommendedRow = document.querySelector(".recommended-row");
let relatedRow = document.querySelector(".retaled-row");
let dateValue = new Date();

rateReviewLink.addEventListener("click", function () {
  descriptionSection.style.display = "none";
  rateReviewSection.style.display = "block";
  rateReviewLink.classList.add("active");
  description.classList.remove("active");
});
descriptionLink.addEventListener("click", function () {
  descriptionSection.style.display = "block";
  rateReviewSection.style.display = "none";
  descriptionLink.classList.add("active");
  rateReviewLink.classList.remove("active");
});
// COMMENTS
function showAlert(alerttext, infoalert) {
  Toastify({
    text: alerttext,
    className: infoalert,
    style: {
      background: "linear-gradient(to right, #222221, #b00000 )",
    },
  }).showToast();
}
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    username: userNameInp.value,
    email: emailInp.value,
    commentContent: textArea.value,
    commentDate: dateValue.toLocaleString(),
  };

  let response = await axios("http://localhost:8080/users");
  let dataUser = response.data;
  let checkUser = dataUser.find((user) => user.check === true);

  if (checkUser) {
    let resp = await axios(`${BASE_URL}/allMovies/${movieId}`);
    let data = resp.data;
    if (data.comments) {
      data.comments.push(obj);
    } else {
      data.comments = [obj];
    }
    await axios.patch(`${BASE_URL}/allMovies/${movieId}`, data);
  } else {
    showAlert("Please Sign in", "info");
  }
});

function drawDetails(item) {
  video.innerHTML = "";
  video.innerHTML = `
    
    <iframe
    width="560"
    height="315"
    src="${item.trailer}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  ></iframe>
    
    
    `;

  detailsRow.innerHTML = "";
  detailsRow.innerHTML = `
<div class="col-md-9 col-12 my-3">
<div class="details-content">
  <div class="title">
    <h2>${item.movieName}</h2>
    <p>${item.imbd}</p>
    <img
    src="./assets/img/imdb-film-director-computer-icons-television-u-b9ac4bbc964b1399dc797db594cf699a.png"
      alt=""
    />
  </div>
  <p class="genres">${item.genres}</p>
  <div class="time-date">
    <p class="gp">GP</p>
    <h3 class="time">${item.time}</h3>
    <h3 class="date">${item.releaseDate}</h3>
  </div>
  <div class="icons">
    <div>
      <i class="fa-solid fa-share"></i>
    </div>
    <div>
      <i class="fa-solid fa-heart"></i>
    </div>
    <div>
      <i class="fa-solid fa-plus" onclick=addMyList(${item.id})></i>
    </div>
    <div>
      <i class="fa-solid fa-download"></i>
    </div>
  </div>
  <div class="tags">
    <i class="fa-solid fa-tags"></i>
    <p class="tags-title">Tags:</p>
    <p class="tags-content">Action, Adventure, Horror</p>
  </div>
</div>
</div>
<div class="col-md-3 col-12 text-sm-right p-3  ">
<div class="card right-content">
  <img
    src="${item.img}"
    alt=""
    class="detailsimg"
  />
  
  <div class="overlay">
    <i class="fa-solid fa-play"></i>
    <p>Trailer Link</p>
  </div>
</div>
</div>


`;
  description.innerHTML = "";
  description.innerHTML = `
<p>
${item.title}
</p>
`;
  commentsRow.innerHTML = "";
  commentsRow.innerHTML += `

<div class="col-lg-12 my-3">
<div class="card">
  <img
    src="./assets/img/users/57337b679b7a518894c3ed321f5ad211.jpeg"
    alt=""
  />
  <div class="users-info">
    <div class="title">
      <h3>${item.comments.username} <span>- ${item.comments.commentDate}
  </span></h3>
      <div class="icons-stars">
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
        <i class="fa-regular fa-star"></i>
      </div>
    </div>
    <div class="comment">
      <p>${item.comments.commentContent}</p>
    </div>
  </div>
</div>
</div>

`;
}
async function getData() {
  let resp = await axios(`${BASE_URL}/allMovies/${movieId}`);
  let data = resp.data;
  drawDetails(data);
  getAllComments(data.comments);
}
getData();

function drawRecommendedRow(arr) {
  recommendedRow.innerHTML = "";
  arr.forEach((item) => {
    recommendedRow.innerHTML += `
        
        <div class="col-lg-3 col-md-6 col-sm-6 my-3">
        <div class="card">
          <img src="${item.img}" alt="" />
          <div class="overlay">
            <div class="content">
              <h5>${item.movieName}</h5>
              <p class="time">${item.time}</p>
              <a href="details.html?id=${item.id}">Play Now</a>
            </div>
            <div class="icons">
              <div>
                <i class="fa-solid fa-heart"></i>
              </div>
              <div>
                <i class="fa-solid fa-plus" onclick=addMyList(${item.id})></i>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        
        `;
  });
}

async function getRecommendedData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  let data = resp.data;
  drawRecommendedRow(data.slice(0, 4));
}
getRecommendedData();

function drawRelatedRow(arr) {
  relatedRow.innerHTML = "";
  arr.forEach((item) => {
    relatedRow.innerHTML += `
          
          <div class="col-lg-3 col-md-6 col-sm-6 my-3">
          <div class="card">
            <img src="${item.img}" alt="" />
            <div class="overlay">
              <div class="content">
                <h5>${item.movieName}</h5>
                <p class="time">${item.time}</p>
                <a href="details.html?id=${item.id}">Play Now</a>
              </div>
              <div class="icons">
                <div>
                  <i class="fa-solid fa-heart"></i>
                </div>
                <div>
                  <i class="fa-solid fa-plus" onclick=addMyList(${item.id})></i>
                </div>
              </div>
            </div>
          </div>
        </div>
          
          
          `;
  });
}
async function getRelatedData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  let data = resp.data;
  drawRelatedRow(data.slice(4, 8));
}
getRelatedData();

function getAllComments(arr) {
  commentsRow.innerHTML = "";
  arr.forEach((comment) => {
    commentsRow.innerHTML += `
    <div class="col-lg-12 my-3">
      <div class="card">
        <img src="./assets/img/users/57337b679b7a518894c3ed321f5ad211.jpeg" alt="" />
        <div class="users-info">
          <div class="title">
            <h3>${comment.username} <span>- ${comment.commentDate}</span></h3>
            <div class="icons-stars">
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
          </div>
          <div class="comment">
            <p>${comment.commentContent}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  });
}

function showAlert(alerttext, infoalert) {
  Toastify({
    text: alerttext,
    className: infoalert,
    style: {
      background: "linear-gradient(to right, #222221, #b00000 )",
    },
  }).showToast();
}

// ADD MY LIST
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
