let leftBarsIcon=document.querySelector(".fa-bars")
let leftBars=document.querySelector("#left-bars")
let leftBarsBurger=document.querySelector("#left-bars-burger")

leftBarsIcon.addEventListener("click",function(){
    leftBars.classList.toggle("show-bars")
    leftBarsBurger.classList.toggle("show-burger")
})