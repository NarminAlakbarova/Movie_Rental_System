let addEditBtn = document.querySelector("#add");
let imgInput = document.querySelector("#imginp");
let textTitle = document.querySelector("textarea");
let imbdInp = document.querySelector("#imbd");
let timeInp = document.querySelector("#time");
let selectSection = document.querySelector("#selection");
let genresInp = document.querySelector("#genres");
let dateInp = document.querySelector("#date");
let moviesNameInp = document.querySelector("#name");
let trailerInp = document.querySelector("#urlinp");
let form = document.querySelector("form");
let base64;
let section;
const BASE_URL = "http://localhost:8080";
let id = new URLSearchParams(window.location.search).get("id");
selectSection.addEventListener("change", function (e) {
  section = e.target.value;
});
async function drawInput() {
  let resp = await axios(`${BASE_URL}/allMovies/${id}`);
  let data = resp.data;
  textTitle.value = data.title;
  imbdInp.value = data.imbd;
  timeInp.value = data.time;
  genresInp.value = data.genres;
  dateInp.value = data.releaseDate;
  moviesNameInp.value = data.movieName;
  selectSection.value = data.section;
  trailerInp.value = data.trailer;
  addEditBtn.innerHTML = "Edit";
}
drawInput();

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    movieName: moviesNameInp.value,
    imbd: imbdInp.value,
    title: textTitle.value,
    releaseDate: dateInp.value,
    trailer: trailerInp.value,
    genres: genresInp.value,
    img: base64,
    section: section || "Lorem",
  };
  if (id) {
    await axios.patch(`${BASE_URL}/allMovies/${id}`, obj);
  } else {
    await axios.post(`${BASE_URL}/allMovies`, obj);
  }
  window.location.href = "films.html";
});

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const uploadImage = async (event) => {
  const file = event.target.files[0];
  base64 = await convertBase64(file);
  // console.log(file);
};

imgInput.addEventListener("change", (e) => {
  //   console.log(e.target.files);
  uploadImage(e);
});
