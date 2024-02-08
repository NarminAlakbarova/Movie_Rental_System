let tbody = document.querySelector("tbody");

const BASE_URL = "http://localhost:8080";

function drawRow(arr) {
  tbody.innerHTML = "";
  arr.forEach((item) => {
    tbody.innerHTML += `
    <tr>
    <td>${item.contactDate}</td>

    <td> <img src="../assets/img/users/pic-4.png" alt="Avatar" /></td>
    <td>${item.username}</td>
    <td>${item.content}</td>
 
    <td><i class='fa-solid fa-trash btn' onclick=deleteContactCard(${item.id})></i></td>
  </tr>
    

        
        `;
  });
}
async function getAllData() {
  let resp = await axios(`${BASE_URL}/contact`);
  let data = resp.data;

  drawRow(data);
}
getAllData();

async function deleteContactCard(id) {
  await axios.delete(`${BASE_URL}/contact/${id}`);
  document.querySelector(`#${id}`).closest("span").remove();
}
