let nameInp = document.querySelector("#nameinp");
let lastName = document.querySelector("#last-name");
let phoneInp = document.querySelector("#phone");
let emailInp = document.querySelector("#emailinp");
let contentInp = document.querySelector("#content");
let form = document.querySelector("form");
const BASE_URL = "http://localhost:8080";
let dateValue = new Date();

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let obj = {
    username: nameInp.value,
    lastname: lastName.value,
    phone: phoneInp.value,
    email: emailInp.value,
    content: contentInp.value,
    contactDate: dateValue.toLocaleString(),

  };
  await axios.post(`${BASE_URL}/contact`, obj);
});
