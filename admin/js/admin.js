const BASE_URL = "http://localhost:8080/";
let tBody = document.querySelector("tbody");
let allData = [];
let number=0
function drawTable(arr) {
  tBody.innerHTML = "";
  arr.forEach((user) => {
    tBody.innerHTML += `
  
  <tr>
 <td>${++number}</td>
 <td><img src="../assets/img/users/pic-1.png" alt="" /></td>
 <td>${user.userName}</td>
 <td>${user.firstName} ${user.lastName}</td>
 <td>
${user.password}</td>
  <td>
 <a class="fa-solid fa-eye btn btn-success" onclick=showMoreDetails(${user.id})></a>
 </td>
</tr>
  
  `;
  });
}
async function getData() {
  let resp = await axios(`${BASE_URL}users`);
  let data = resp.data;
  allData = data.filter((user) => user.isAdmin !== true);
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

function showMoreDetails(userId) {
  let findUser = allData.find((item) => item.id == userId);
  console.log(findUser);
  let modalBody = document.getElementById("userModalBody");
  modalBody.innerHTML = `
        
       <h5 class="text-center">${findUser.userName}</h5>
       <p><strong>First-Name: </strong> ${findUser.firstName}</p>
       <p><strong>Last-Name: </strong>${findUser.lastName}</p>
       <p><strong>Email: </strong>${findUser.email}</p>
        `;
  let userModal = new bootstrap.Modal(document.getElementById("userModal"));
  userModal.show();
  let closeModalBtn = document.getElementById("closeModalBtn");
  closeModalBtn.addEventListener("click", function () {
    userModal.hide();
  });
}

