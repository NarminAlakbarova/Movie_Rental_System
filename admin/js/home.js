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
        backgroundColor: "#E5EFEF",
        borderColor: "#006666",
        data: yValues2,
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Grafik Başlığı",
      className: "chart-title",
    },
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
new Chart("myChart2", {
  type: "doughnut",
  data: {
    datasets: [
      {
        label: "İlk Veri Setim",
        data: [300, 50, 100],
        backgroundColor: ["#FF997C", "#FFAE1A", "#589494"],
        hoverOffset: 4,
      },
    ],
    labels: ["Kırmızı", "Mavi", "Sarı"],
  },
  options: {
    title: {
      display: true,
      text: "Lorem",
    },
  },
});

let a = 0;
$(document).ready(function () {
  $(".value-counter").each(function () {
    let $this = $(this);
    jQuery({ Counter: 0 }).animate(
      { Counter: $this.text() },
      {
        duration: 2000,
        easing: "swing",
        step: function () {
          $this.text(Math.ceil(this.Counter));
        },
      }
    );
  });
  a = 1;
});
