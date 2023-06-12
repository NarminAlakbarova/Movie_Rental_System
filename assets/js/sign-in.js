let form = document.querySelector("form");
let userNameEmailInp = document.querySelector(".username-email");
let passwordInp = document.querySelector(".passwordInp");
const BASE_URL = "http://localhost:8080/";
let allUsers = [];
async function getAllUser() {
  let resp = await axios(`${BASE_URL}users`);
  allUsers = resp.data;
}
getAllUser();
form.addEventListener("submit", function (e) {
  e.preventDefault();
  let rightUser = allUsers.find(
    (item) =>
      userNameEmailInp.value === item.userName &&
      passwordInp.value === item.password
  );
  let admin = allUsers.find(
    (item) =>
      item.isAdmin === true &&
      item.firstName === userNameEmailInp.value &&
      item.password === passwordInp.value
  );
  if (!admin && rightUser) {
    window.location.href = "index.html";
  }
  if (admin) {
    window.location.href = "../admin/admin.html";
  } else {
    alert("no");
  }
});
