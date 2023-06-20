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

// ALERT
function showAlert(alerttext, infoalert) {
  Toastify({
    text: alerttext,
    className: infoalert,
    style: {
      background: "linear-gradient(to right, #222221, #b00000 )",
    },
  }).showToast();
}
// FORM
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (
    userNameInp.value === "" ||
    emailInp.value === "" ||
    firstNameInp.value === "" ||
    lastNameInp.value === "" ||
    passwordInp.value === "" ||
    passwordInp2.value === ""
  ) {
    showAlert("Please fill in all the fields", "info");
    return; 
  }
  let obj = {
    isAdmin: false,
    userName: userNameInp.value,
    firstName: firstNameInp.value,
    lastName: lastNameInp.value,
    password: passwordInp.value,
    email: emailInp.value,
  };
  if (passwordInp.value === passwordInp2.value) {
    await axios.post(`${BASE_URL}users`, obj);
    window.location.href = "sign-in.html";
  } else {
    showAlert("passwords are different", "info");
  }
});
