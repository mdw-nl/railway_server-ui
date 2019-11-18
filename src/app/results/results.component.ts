import { Component, OnInit } from "@angular/core";
import { BackendMockService } from "app/backend-mock.service";
import Chart from "chart.js";

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"]
})
export class ResultsComponent implements OnInit {
  public chartColor = "#000000";
  constructor(public mock: BackendMockService) {}

  ngOnInit() {
    this.drawLineChart();
    this.drawBars();
    this.drawAuc();
    this.drawPieChart();
    // document.getElementById("json-results").innerHTML = JSON.stringify(this.mock.clientArray[0], undefined, 2);
  }

  drawLineChart() {
    let canvas: any = document.getElementById("activeUsers");
    let ctx: any = canvas.getContext("2d");

    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ['0','10','20','30','40','50','60','70','80','90','100','110', '120'],
        datasets: [
          {
            label: "Active Users",
            borderColor: "#6bd098",
            // backgroundColor: "#6bd000",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            borderWidth: 3,
            data: [100, 100, 100, 100, 100, 100, 100, 100, 93, 50, 7, 0, 0]
          }, {
            label: "Active Users",
            borderColor: "#6bd098",
            // backgroundColor: "#6bd000",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            borderWidth: 3,
            data: [100, 100, 100, 100, 100, 100, 100, 93, 57, 7, 0, 0, 0]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: true,
                maxTicksLimit: 5
                //padding: 20
              },
              gridLines: {
                drawBorder: true,
                zeroLineColor: "transparent",
                color: "rgba(0,0,0,0.3)",
                display: true
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1,
              gridLines: {
                drawBorder: true,
                color: "rgba(0,0,0,0.3)",
                zeroLineColor: "transparent",
                display: true
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }
          ]
        }
      }
    });
  }

  drawBars() {
    let canvas: any = document.getElementById("chartViews");

    let ctx: any = canvas.getContext("2d");

    let myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "21-25",
          "26-30",
          "31-35",
          "36-40",
          "41-45",
          "46-50",
          "50-55",
          "56-60",
          "61-65",
          "66-70",
          "71-75",
          "76-80",
          "81-85"
        ],
        datasets: [
          {
            label: "Data",
            borderColor: "#fcc468",
            fill: true,
            backgroundColor: "#fcc468",
            hoverBorderColor: "#fcc468",
            borderWidth: 5,
            data: [20, 70, 80, 100, 90, 60, 30, 20, 70, 80, 100, 90, 60]
          }
        ]
      },
      options: {
        tooltips: {
          tooltipFillColor: "rgba(0,0,0,0.5)",
          tooltipFontFamily:
            "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipFontSize: 14,
          tooltipFontStyle: "normal",
          tooltipFontColor: "#fff",
          tooltipTitleFontFamily:
            "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          tooltipTitleFontSize: 14,
          tooltipTitleFontStyle: "bold",
          tooltipTitleFontColor: "#fff",
          tooltipYPadding: 6,
          tooltipXPadding: 6,
          tooltipCaretSize: 8,
          tooltipCornerRadius: 6,
          tooltipXOffset: 10
        },

        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                fontStyle: "bold",
                beginAtZero: true,
                maxTicksLimit: 5,
                padding: 20
              },
              gridLines: {
                zeroLineColor: "transparent",
                display: true,
                drawBorder: false,
                color: "#9f9f9f"
              }
            }
          ],
          xAxes: [
            {
              barPercentage: 0.4,
              gridLines: {
                zeroLineColor: "white",
                display: false,

                drawBorder: false,
                color: "transparent"
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f",
                fontStyle: "bold"
              }
            }
          ]
        }
      }
    });
  }

  drawAuc() {
    let canvas: any = document.getElementById("auc");
    let ctx: any = canvas.getContext("2d");

    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        datasets: [
          {
            label: "Reference Line",
            borderColor: "#000000",
            // backgroundColor: "#6bd000",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            borderWidth: 3,
            data: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
          },
          {
            label: "AUC",
            borderColor: "#6bd098",
            // backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: true,
            borderWidth: 3,
            data: [0, 0.7, 0.75, 0.8, 0.86, 0.9, 0.93, 0.95, 1.0, 1.0, 1.0]
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: true,
                maxTicksLimit: 20
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(0,0,0,0.3)",
                display: true
              }
            }
          ],

          xAxes: [
            {
              // barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(0,0,0,0.3)",
                zeroLineColor: "transparent",
                display: true
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }
          ]
        }
      }
    });
  }

  drawPieChart() {
    let canvas: any = document.getElementById("piechart");
    let ctx: any = canvas.getContext("2d");

    let myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["male", "female"],
        datasets: [
          {
            label: "Gender",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd"],
            borderWidth: 0,
            data: [542, 480]
          }
        ]
      },
      options: {
        legend: {
          display: true
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    });
  }
}
