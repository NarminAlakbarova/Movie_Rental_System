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
let filteredData = [];
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


      <i class="fa-solid fa-eye btn btn-success"></i>
      <i class="fa-solid fa-pen-to-square btn btn-secondary"></i>
      <i class="fa-solid fa-trash btn btn-danger" onclick=deleteMovies(${
        item.id
      }) id=${item.id}></i>
    </td>
  </tr>
    
    `;
  });
}
// GETDATA
async function getAllData() {
  let resp = await axios(`${BASE_URL}/allMovies`);
  let data = resp.data;
  filteredData = data;
  drawTabele(data);
}
getAllData();
// DELETE
async function deleteMovies(moviesId) {
  await axios.delete(`${BASE_URL}/allMovies/${moviesId}`);

  document.querySelector(`#${moviesId}`).closest("tr").remove();
}
