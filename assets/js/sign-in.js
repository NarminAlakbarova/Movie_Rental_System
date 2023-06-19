let form = document.querySelector("form");
let userNameEmailInp = document.querySelector(".username-email");
let passwordInp = document.querySelector(".passwordInp");
const BASE_URL = "http://localhost:8080/";
let allUsers = [];
function showAlert(alerttext, infoalert) {
  Toastify({
    text: alerttext,
    className: infoalert,
    style: {
      background: "linear-gradient(to right, #222221, #b00000 )",
    },
  }).showToast();
}
// getAllUser();
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let resp = await axios(`${BASE_URL}users`);
  allUsers = resp.data;
  let adminUsers = allUsers.filter((item) => item.isAdmin === true);

  let admin = adminUsers.find(
    (item) =>
      item.firstName === userNameEmailInp.value &&
      item.password === passwordInp.value
  );

  if (admin) {
    window.location.href = "../admin/admin.html";
  } else {
    let regularUser = allUsers.find(
      (item) =>
        item.userName === userNameEmailInp.value &&
        item.password === passwordInp.value
    );
    if (regularUser) {
      await axios.patch(`${BASE_URL}users/${regularUser.id}`, {
        check: true,
      });
      if (regularUser.isAdmin) {
        window.location.href = "../admin/admin.html";
      } else {
        window.location.href = "index.html";
      }
    } else {
      showAlert("Invalid credentials", "info");
    }
  }
});
