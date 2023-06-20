const BASE_URL = "http://localhost:8080/";
let tBody = document.querySelector("tbody");
let allData = [];
let number = 0;
function drawTable(arr) {
  tBody.innerHTML = "";
  arr.forEach((user) => {
    tBody.innerHTML += `
  
  <tr>
 <td>${++number}</td>

 <td><img src="../assets/img/users/pic-1.png" alt="" /></td>

 <td>${user.userName}</td>

 <td>${user.firstName} ${user.lastName}</td>

 <td>${user.password}</td>
<td>${user.isAdmin === true ? "Admin" : "User"}</td>

  <td>

 <a class="fa-solid fa-eye btn btn-success" onclick=showMoreDetails(${
   user.id
 })></a>
 <a class="fa-solid fa-edit btn btn-primary" onclick=editUser(${user.id}) ></a>
 </td>
</tr>
  
  `;
  });
}
async function getData() {
  let resp = await axios(`${BASE_URL}users`);
  let data = resp.data;
  allData = data;
  drawTable(allData);
}
getData();
const xValues1 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const yValues2 = [110, 50, 212, 156, 246, 124, 236, 200, 146, 90, 222];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues1,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues2,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      y: {
        min: 6,
        max: 230,
        ticks: {
          stepSize: 50,
        },
      },
    },
  },
});

let modalBody = document.getElementById("userModalBody");
let userModal = new bootstrap.Modal(document.getElementById("userModal"));
let closeModalBtn = document.getElementById("closeModalBtn");

function showMoreDetails(userId) {
  let findUser = allData.find((item) => item.id == userId);
  modalBody.innerHTML = `
      <div class="content">
      <h5 class="text-center">${findUser.userName}</h5>
      <p><strong>First-Name: </strong> ${findUser.firstName}</p>
      <p><strong>Last-Name: </strong>${findUser.lastName}</p>
      <p><strong>Email: </strong>${findUser.email}</p>
      </div>
        `;
  userModal.show();
  closeModalBtn.addEventListener("click", function () {
    userModal.hide();
  });
}

async function editUser(userId) {
  let resp = await axios(`${BASE_URL}users/${userId}`);
  let data = resp.data;
  modalBody.innerHTML = "";
  modalBody.innerHTML = `
  <div class="ques">
  <p>Do you want to ${data.isAdmin === true ? "User" : "Admin"} ${
    data.userName
  }?</p>
  </div>
    <div class="buttons">
      <button id="yes-btn" onclick=yesFunc(${userId})>Yes</button>
    </div>
  `;
  userModal.show();
  closeModalBtn.addEventListener("click", function () {
    userModal.hide();
  });
}

async function yesFunc(id) {
  const resp = await axios.get(`${BASE_URL}users/${id}`);
  const isAdmin = resp.data.isAdmin;
  await axios.patch(`${BASE_URL}users/${id}`, { isAdmin: !isAdmin });
}

