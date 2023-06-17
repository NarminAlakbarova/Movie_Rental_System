let form = document.querySelector("form");
let userNameEmailInp = document.querySelector(".username-email");
let passwordInp = document.querySelector(".passwordInp");
const BASE_URL = "http://localhost:8080/";
let allUsers = [];

// getAllUser();
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let resp = await axios(`${BASE_URL}users`);
  allUsers = resp.data;
  let admin = allUsers.find(
    (item) =>
      item.isAdmin === true &&
      item.firstName === userNameEmailInp.value &&
      item.password === passwordInp.value
  );

  if (admin) {
    window.location.href = "../admin/admin.html";
  } else {
    let rightUser = allUsers.find(
      (item) =>
        userNameEmailInp.value === item.userName &&
        passwordInp.value === item.password
    );
    // console.log(rightUser);
    if (rightUser) {
      await axios.patch(`http://localhost:8080/users/${rightUser.id}`, { check: true });
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials");
    }
  }
});
