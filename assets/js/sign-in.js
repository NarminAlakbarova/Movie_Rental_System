let form = document.querySelector("form");
let userNameEmailInp = document.querySelector(".username-email");
let passwordInp = document.querySelector(".passwordInp");
const BASE_URL = "http://localhost:8080/";
let allUsers = [];

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
    let regularUser = allUsers.find(
      (item) =>
        item.userName === userNameEmailInp.value &&
        item.password === passwordInp.value
    );
    if (regularUser) {
      if (!regularUser.isAdmin) {
        await axios.patch(`${BASE_URL}users/${regularUser.id}`, {
          check: true,
        });
      }
      window.location.href = regularUser.isAdmin
        ? "../admin/admin.html"
        : "index.html";
    } else {
      showAlert("Invalid credentials", "info");
    }
  }
});
