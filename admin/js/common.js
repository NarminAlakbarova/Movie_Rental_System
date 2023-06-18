let countMessage = document.querySelector(".count");
const CONTACT_URL = "http://localhost:8080";
async function favCaunter() {
  let resp = await axios(`${CONTACT_URL}/contact`);
  let data = resp.data;
  let newFavCounter = data.length;

  countMessage.innerHTML = newFavCounter.toString();
}
favCaunter();

// DARK MODE
const sunIcon = document.querySelector(".fa-sun");
const body = document.body;

sunIcon.addEventListener("click", function () {
  body.classList.toggle("dark-mode");
  sunIcon.classList.contains("fa-sun")
    ? (this.classList = "fa-solid fa-moon")
    : (this.classList = "fa-solid fa-sun");
});
