let cardsRow = document.querySelector(".cards-row");
let commentsRow = document.querySelector(".comment-row");
let moreBtn = document.querySelector("#more-btn");
const BASE_URL = "http://localhost:8080";
let alldata = [];
let max = 18;
function drawCardRow(arr) {
  cardsRow.innerHTML = "";
  arr.forEach((item) => {
    cardsRow.innerHTML += `
        <div class="col-lg-2 my-3">
        <div class="card" onclick=drawComment(${item.id})>
          <img
            src="${item.img}"
            alt=""
          />
        </div>
      </div>
      
        `;
  });
}
async function getCardsData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  data = resp.data;
  alldata = data;
  drawCardRow(alldata.slice(0, max));
}
getCardsData();

async function drawComment(movieId) {
  let findMovie = alldata.find((item) => item.id == movieId);
  console.log(findMovie);
  commentsRow.innerHTML = "";

  if (findMovie && findMovie.comments && findMovie.comments.length > 0) {
    findMovie.comments.forEach((comment) => {
      commentsRow.innerHTML += `
          <div class="col-lg-12 my-2">
            <div class="card comment-card">
              <img src="../assets/img/users/pic-3.png" alt="" />
              <div class="card-content">
                <h5>${comment.username}</h5>
                <p>${comment.email}.</p>
                <p>${comment.commentContent}</p>
              </div>
            </div>
          </div>
        `;
    });
  } else {
    commentsRow.innerHTML = `
      <div class="col-lg-12 my-2">
      <p class="comment-title">No comments found for this movie.</p>
      </div>
      `;
  }
}
moreBtn.addEventListener("click", function () {
  max = max + 18;
  // if (max > alldata.length) {
  //   moreBtn.style.display = "none";
  // } else {
  //   getCardsData();
  // }
  getCardsData()
});
