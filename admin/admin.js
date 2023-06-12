const xValues1 = [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
const yValues2 = [7, 8, 8, 9, 9, 9, 10, 11, 14, 14, 15];

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
      yAxes: [{ ticks: { min: 6, max: 16 } }],
    },
  },
});

document.addEventListener("DOMContentLoaded", function () {
  let eyeButtons = document.querySelectorAll(".fa-eye");
  eyeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      let modalBody = document.getElementById("userModalBody");
      modalBody.innerHTML = `
      
        <p><strong>№:</strong> 1</p>
        <p><strong>UserName:</strong> nnn</p>
        <p><strong>Name:</strong> nnnn</p>
      `;
      let userModal = new bootstrap.Modal(document.getElementById("userModal"));
      userModal.show();
      let closeModalBtn = document.getElementById("closeModalBtn");
      closeModalBtn.addEventListener("click", function () {
        userModal.hide();
      });
    });
  });
});
