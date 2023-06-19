let allMovies = JSON.parse(localStorage.getItem("favMovies")) || [];
console.log(allMovies);
let myList = document.querySelector(".my-list-row");

function favMovies() {
  myList.innerHTML = "";
  allMovies.forEach((movie) => {
    myList.innerHTML += `
        <div class="col-lg-3 col-md-4 col-sm-6 my-3">
        <div class="card">
          <div class="overlay"></div>
          <img src="${
            movie.img.length > 100 ? movie.img : movie.img.slice(1)
          }" alt="" />
          <div class="content">
            <h3>${movie.movieName}</h3>
            <p>${movie.time}</p>
            <a href="details.html?id=${movie.id}">Play Now</a>
          </div>
          <div class="icons">
            <div>
              <i class="fa-solid fa-trash" onclick=deleteFavMovie(${
                movie.id
              })></i>
            </div>
          </div>
        </div>
      </div>
        
        
        
        `;
  });
}
favMovies();

function deleteFavMovie(movieId) {
  allMovies = allMovies.filter((obj) => obj.id != movieId);
  localStorage.setItem("favMovies", JSON.stringify(allMovies));
  favMovies();
}
