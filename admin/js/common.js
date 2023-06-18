let countMessage=document.querySelector(".count")
const CONTACT_URL = "http://localhost:8080";
async function favCaunter() {
    let resp = await axios(`${CONTACT_URL}/contact`);
    let data = resp.data;
    let newFavCounter = data.length;
  
    countMessage.innerHTML = newFavCounter.toString();
  }
  favCaunter();