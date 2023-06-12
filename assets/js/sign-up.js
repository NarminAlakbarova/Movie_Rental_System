let form = document.querySelector("form");
let userNameInp = document.querySelector(".usernameinp");
let emailInp = document.querySelector(".emailinp");
let firstNameInp = document.querySelector(".firstnameinp");
let lastNameInp = document.querySelector(".lastnameinp");
let passwordInp = document.querySelector(".passwordinp");
let passwordInp2 = document.querySelector(".passwordinp2");
let basicPrice = document.querySelector("#basic");
let freePrice = document.querySelector("#free");
let premiumPrice = document.querySelector("#premium");

const BASE_URL = "http://localhost:8080/";

form.addEventListener("submit", async function (e) {
  
  e.preventDefault();
  let obj = {
    isAdmin: false,
    userName: userNameInp.value,
    firstName: firstNameInp.value,
    lastName: lastNameInp.value,
    password: passwordInp.value,
  };
  if (passwordInp.value === passwordInp2.value) {
    await axios.post(`${BASE_URL}users`, obj);
    window.location.href = "sign-in.html";
  } else {
    alert("no");
  }
});


