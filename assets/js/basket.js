let basketCol = document.querySelector(".basket-row");
let countBasket = document.querySelector(".count-basket");
let subtotalCount = document.querySelector(".subtotal");
let allInputs = document.querySelectorAll("input");
let submitBtn = document.querySelector(".submitbtn");
let allPremiumMovies = JSON.parse(localStorage.getItem("premiumMovies")) || [];
let purchasedMovies = JSON.parse(localStorage.getItem("myMovies")) || [];

// DRAW FUNC
function allBasket() {
  basketCol.innerHTML = "";
  allPremiumMovies.forEach((item) => {
    basketCol.innerHTML += `
<div class="card mb-3">
<div class="card-body">
  <div class="d-flex justify-content-between">
    <div class="d-flex flex-row align-items-center">
      <div>
        <img
          src="${item.img}"
          class="img-fluid rounded-3"
          alt="Shopping item"
        />
      </div>
      <div class="title">
        <h5>${item.movieName}</h5>
        <p class="genres">${item.genres}</p>
        <p>${item.title.split(" ").slice(0, 3).concat("...").join(" ")}</p>
      </div>
    </div>
    <div class="price">
      <div class="price-title">
        <h5 class="">${item.price} $</h5>
      </div>

      <a href="#"><i class="fas fa-trash-alt" onclick=deleteBasket(${
        item.id
      })></i></a>
    </div>
  </div>
</div>
</div>


`;
  });
}

allBasket();

// CALC SUBTOTAL
function calcSubtotal() {
  let totalPrice = 0;
  allPremiumMovies.forEach((item) => {
    totalPrice += item.price;
  });
  subtotalCount.innerHTML = `${totalPrice} $`;
}
calcSubtotal();


// BASKET LENGTH
function basketLength() {
  countBasket.innerHTML = `${allPremiumMovies.length}`;
}

basketLength();

// DELETE BASKET
function deleteBasket(movieId) {
  allPremiumMovies = allPremiumMovies.filter((obj) => obj.id != movieId);
  localStorage.setItem("premiumMovies", JSON.stringify(allPremiumMovies));
  allBasket();
  calcSubtotal();
  basketLength();
}

console.log(allInputs);

// SHOW ALERT
function showAlert(alerttext, infoalert) {
  Toastify({
    text: alerttext,
    className: infoalert,
    style: {
      background: "linear-gradient(to right, #222221, #b00000 )",
    },
  }).showToast();
}

submitBtn.addEventListener("click", function () {
  if (
    allInputs[1].value &&
    allInputs[2].value &&
    allInputs[3].value &&
    allInputs[4].value
  ) {
    purchasedMovies.push(...allPremiumMovies);
    localStorage.setItem("myMovies", JSON.stringify(purchasedMovies));
    allPremiumMovies = [];
    localStorage.removeItem("premiumMovies");
    basketCol.innerHTML = "";
    subtotalCount.innerHTML = "0";
    showAlert("Items purchased successfully!", "info");
    basketLength();
  } else {
    showAlert("Please fill in all the required fields.", "info");
  }
});
