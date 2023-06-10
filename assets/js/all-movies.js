let genresMenu=document.querySelector(".fa-ellipsis-vertical")
let genresUl=document.querySelector(".genres-ul")
genresMenu.addEventListener("click",function(){
    genresUl.classList.toggle("show")
})