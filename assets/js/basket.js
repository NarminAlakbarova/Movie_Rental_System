let basketCol = document.querySelector(".basket-row");

let countBasket = document.querySelector(".count-basket");
let subtotalCount = document.querySelector(".subtotal");
let allPremiumMovies = JSON.parse(localStorage.getItem("premiumMovies")) || [];
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

function calcSubtotal() {
  let totalPrice = 0;
  allPremiumMovies.forEach((item) => {
    totalPrice += item.price;
  });
  subtotalCount.innerHTML = `${totalPrice} $`;
}

calcSubtotal();

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
