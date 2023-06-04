let burgerMenu=document.querySelector("#burger-menu")
let markIcon=document.querySelector(".fa-xmark")
let menuIcon=document.querySelector(".fa-bars")
let header = document.querySelector("header");
let searchInp = document.querySelector(".search-input");
let searchIcon = document.querySelector(".fa-search");

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