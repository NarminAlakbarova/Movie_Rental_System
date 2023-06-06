let burgerMenu=document.querySelector("#burger-menu")
let markIcon=document.querySelector(".fa-xmark")
let menuIcon=document.querySelector(".fa-bars")
let header = document.querySelector("header");
let searchInp = document.querySelector(".search-input");
let searchIcon = document.querySelector(".fa-search");
let cards = document.querySelectorAll('.card');

menuIcon.addEventListener("click",function(){
    burgerMenu.classList.toggle("show")
})
markIcon.addEventListener("click",function(){
    burgerMenu.classList.toggle("show")
})

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    header.style.background = "#141414";
  } else {
    header.style.background = "";
  }
}
window.addEventListener("scroll", scrollFunction);
searchIcon.addEventListener("click",function(){
    searchInp.classList.toggle("show-inp")
})


cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => {
            if(c !== card){
                c.classList.remove('active');
            }
        });

        card.classList.add('active');
    });
});
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 50,
    },
  },
});
