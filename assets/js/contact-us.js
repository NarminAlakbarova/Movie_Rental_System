let nameInp = document.querySelector("#nameinp");
let lastName = document.querySelector("#last-name");
let phoneInp = document.querySelector("#phone");
let emailInp = document.querySelector("#emailinp");
let contentInp = document.querySelector("#content");
let form = document.querySelector("form");
const BASE_URL = "http://localhost:8080";
let dateValue = new Date();

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
  let resp = await axios("http://localhost:8080/users");
  let data = resp.data;
  let checkUser = data.find((user) => user.check === true);
  e.preventDefault();
  let obj = {
    username: nameInp.value,
    lastname: lastName.value,
    phone: phoneInp.value,
    email: emailInp.value,
    content: contentInp.value,
    contactDate: dateValue.toLocaleString(),
  };
  if (!checkUser) {
    showAlert("Please Sign in", "info");
  } else {
    await axios.post(`${BASE_URL}/contact`, obj);
  }
});
