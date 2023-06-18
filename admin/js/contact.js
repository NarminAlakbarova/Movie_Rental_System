let contactRow=document.querySelector(".contact-row")

const BASE_URL = "http://localhost:8080";

function drawRow(arr){
    contactRow.innerHTML=""
    arr.forEach((item)=>{
        contactRow.innerHTML+=`
        
        <div class="col-lg-3 my-2">
        <div class="card">
          <div class="avatar">
            <img src="../assets/img/users/pic-4.png" alt="Avatar" />
          </div>
          <div class="message-content">
            <div class="sender">${item.username}</div>
            <div class="message">
              ${item.content}
            </div>
            <div class="timestamp">${item.contactDate}</div>
          </div>
          <div class="back-card"></div>
          <div class="thid-card"></div>
        </div>
      </div>
        
        `
    })
}async function getAllData(){
    let resp=await axios(`${BASE_URL}/contact`)
    let data=resp.data

    drawRow(data)
}
getAllData()


