import { Injectable } from '@angular/core';
import Chart from 'chart.js';
import 'chartjs-plugin-labels';

class ClientData {
  variable: String;
  usable: number;
  total: number;
}

class ClientInfo {
  id: String;
  status: String;
  state: String;
  cohortType: String;
  lastOnline: String;
  user: String;
  mappedVariables: Array<String>;
  ip: String;
  email: String;
  institute: String;
  photo: String;
  chartId: string;
  dataArray: Array<ClientData> = new Array<ClientData>();
  auc:number
}

class ResultsGraph {
  labels: Array<any>;
  dataset: Array<any>;
}

@Injectable({
  providedIn: 'root'
})
export class BackendMockService {
  clientArray: Array<ClientInfo> = new Array<ClientInfo>();
  user = 'user';
  userPhoto: String = './assets/img/default.svg';
  computation: String = 'mean';
  variable: String = 'age'; 
  serverStatus: String = 'idle';
  IDLE: String = 'idle';
  modelProcessed = false;

  resultProfile;
  resultGraph: Array<ResultsGraph>;

  meanOutput = 0;
  distributionOutput = 0;
  sampleSize = 0;

  slope = '-'
  intercept = '-'


  constructor() {
    this.generateClients();
  }

  ngOnInit(){
    
  }

  generateClients() {
    let ClientInfo1: ClientInfo = new ClientInfo();
    ClientInfo1.id = 'MAASTRO'; //"silly-goose-37";
    ClientInfo1.status = 'online';
    ClientInfo1.state = 'idle';
    ClientInfo1.cohortType = 'VALIDATION COHORT';
    ClientInfo1.lastOnline = '1s';
    ClientInfo1.mappedVariables = ['Age', 'Gender', 'RadiationDose'];
    ClientInfo1.ip = '192.186.0.100';
    ClientInfo1.email = 'tim.lustberg@medicaldataworks.nl';
    ClientInfo1.user = 'Tim';
    ClientInfo1.photo = './assets/img/timl.svg';
    ClientInfo1.institute = 'Lustberg Clinics';
    ClientInfo1.chartId = 'client1';
    ClientInfo1.auc = 0;

    let age = new ClientData();
    age.variable = 'age';
    age.usable = 231;
    age.total = 347;
    let gender = new ClientData();
    gender.variable = 'gender';
    gender.usable = 146;
    gender.total = 347;
    let treatment = new ClientData();
    treatment.variable = 'treatment';
    treatment.usable = 312;
    treatment.total = 347;
    ClientInfo1.dataArray.push(age);
    ClientInfo1.dataArray.push(gender);
    ClientInfo1.dataArray.push(treatment);

    let ClientInfo2: ClientInfo = new ClientInfo();
    ClientInfo2.id = 'MGH'; //'quick-cobra-15';
    ClientInfo2.status = 'online';
    ClientInfo2.state = 'idle';
    ClientInfo2.cohortType = 'VALIDATION COHORT';
    ClientInfo2.lastOnline = '5s';
    ClientInfo2.mappedVariables = ['Gender', 'Radiation Dose', 'Survival'];
    ClientInfo2.ip = '192.186.0.101';
    ClientInfo2.email = 'tim.hendriks@medicaldataworks.nl';
    ClientInfo2.user = 'Tim';
    ClientInfo2.photo = './assets/img/timh.svg';
    ClientInfo2.institute = 'Hendriks Clinics';
    ClientInfo2.chartId = 'client2';
    ClientInfo2.auc = 0;

    let age2 = new ClientData();
    let treatment2 = new ClientData();
    let gender2 = new ClientData();
    age2.variable = 'age';
    age2.usable = 354;
    age2.total = 854;
    gender2.variable = 'gender';
    gender2.usable = 261;
    gender2.total = 854;
    treatment2.variable = 'treatment';
    treatment2.usable = 854;
    treatment2.total = 854;
    ClientInfo2.dataArray.push(age2);
    ClientInfo2.dataArray.push(gender2);
    ClientInfo2.dataArray.push(treatment2);

    let ClientInfo3: ClientInfo = new ClientInfo();
    ClientInfo3.id = 'The Christie'; //'tricky-chicken-23';
    ClientInfo3.status = 'online';
    ClientInfo3.state = 'idle';
    ClientInfo3.cohortType = 'TRAINING COHORT';
    ClientInfo3.lastOnline = '3s';
    ClientInfo3.mappedVariables = [
      'Age',
      'Gender',
      'Radiation Dose',
      'Survival'
    ];
    ClientInfo3.ip = '192.186.0.101';
    ClientInfo3.email = 'johan.vansoest@medicaldataworks.nl';
    ClientInfo3.user = 'Johan';
    ClientInfo3.photo = './assets/img/johan.svg';
    ClientInfo3.institute = 'VanSoest Clinics';
    ClientInfo3.chartId = 'client3';
    ClientInfo1.auc = 0;

    let age3 = new ClientData();
    let treatment3 = new ClientData();
    let gender3 = new ClientData();
    age3.variable = 'age';
    age3.usable = 541;
    age3.total = 754;
    gender3.variable = 'gender';
    gender3.usable = 434;
    gender3.total = 754;
    treatment3.variable = 'treatment';
    treatment3.usable = 257;
    treatment3.total = 754;
    ClientInfo3.dataArray.push(age3);
    ClientInfo3.dataArray.push(gender3);
    ClientInfo3.dataArray.push(treatment3);

    this.clientArray.push(ClientInfo1);
    this.clientArray.push(ClientInfo2);
    this.clientArray.push(ClientInfo3);
  }

  startFakeRun(canvas: any) {
    this.serverStatus = 'assigning tasks';
    console.log(this.computation);
    if (this.computation === 'mean') {
      if (this.variable === 'age') {
        this.playStatsAgeScenario(canvas);
      } else if(this.variable === 'gender') {
        this.playStatsGenderScenario(canvas)
      } else {
        this.playStatsTreatmentScenario(canvas);
      }
    }
    if (this.computation === 'linear-regression') {
        if (this.variable === 'age') {
          this.playModelAgeScenario();
        } else if(this.variable === 'gender') {
          this.playModelAgeScenario()
        } else {
          this.playModelTreatmentScenario();
        }
    }
  }

  playStatsAgeScenario(canvas:any) {
    (async () => {
      this.clientArray[0].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[1].state = 'receiving application';
      this.clientArray[2].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients';
      this.clientArray[0].state = 'computing';
      this.clientArray[1].state = 'computing';
      this.clientArray[2].state = 'computing';
      await this.delay(this.randomIntFromInterval(400, 2000));
      this.clientArray[0].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[1].state = 'sending results';
      this.clientArray[0].state = 'idle';
      await this.delay(this.randomIntFromInterval(200, 2000));
      this.clientArray[1].state = 'idle';
      this.clientArray[2].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[2].state = 'idle';
      this.serverStatus = 'processing results';
      await this.delay(this.randomIntFromInterval(300, 3000));
      this.serverStatus = 'idle';
      this.meanOutput = 62.4;
      this.drawBars(canvas);
    })();
  }

  playStatsGenderScenario(canvas: any) {
    this.distributionOutput = 1;
    (async () => {
      this.clientArray[2].state = 'receiving application';
      this.clientArray[0].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[1].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients';
      this.clientArray[1].state = 'computing';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[2].state = 'computing';
      await this.delay(this.randomIntFromInterval(300, 1000));
      this.clientArray[0].state = 'computing';
      this.clientArray[1].state = 'sending results';
      this.clientArray[2].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 2000));
      this.clientArray[1].state = 'idle';
      this.clientArray[0].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[2].state = 'idle';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[0].state = 'idle';
      this.serverStatus = 'processing results';
      await this.delay(this.randomIntFromInterval(300, 1000));
      this.serverStatus = 'idle';
      this.drawPieChart(canvas);
    })();
  }

  playStatsTreatmentScenario(canvas: any) {
    this.distributionOutput = 1;
    (async () => {
      this.clientArray[1].state = 'receiving application';
      this.clientArray[0].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[2].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients';
      this.clientArray[0].state = 'computing';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[1].state = 'computing';
      await this.delay(this.randomIntFromInterval(400, 1500));
      this.clientArray[2].state = 'computing';
      this.clientArray[1].state = 'sending results';
      this.clientArray[0].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 2000));
      this.clientArray[1].state = 'idle';
      this.clientArray[2].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[2].state = 'idle';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[0].state = 'idle';
      this.serverStatus = 'processing results';
      await this.delay(this.randomIntFromInterval(300, 1000));
      this.serverStatus = 'idle';
      this.drawLineChart(canvas);
    })();
  }

  playModelAgeScenario() {
    (async () => {
      this.clientArray[2].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(200, 800));
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients';
      this.clientArray[2].state = 'computing';
      await this.delay(this.randomIntFromInterval(400, 2000));
      this.drawAuc3();
      this.clientArray[2].auc = this.randomIntFromInterval(70, 80) / 100
      this.slope = String(this.randomIntFromInterval(50, 220)/100);
      this.intercept = String(this.randomIntFromInterval(20, 230)/10);
      this.clientArray[2].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[2].state = 'idle';
      this.serverStatus = 'assigning tasks';
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients';
      this.clientArray[1].state = 'receiving application';
      this.clientArray[0].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.clientArray[1].state = 'computing';
      this.clientArray[0].state = 'computing';
      this.clientArray[1].auc = this.randomIntFromInterval(60, 70) / 100
      this.drawAuc2();
      this.clientArray[1].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 2000));
      this.clientArray[1].state = 'idle';
      this.clientArray[0].auc = this.randomIntFromInterval(80, 90) / 100
      this.drawAuc1();
      this.clientArray[0].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[0].state = 'idle';
      this.serverStatus = 'processing results';
      await this.delay(this.randomIntFromInterval(300, 3000));
      this.serverStatus = 'idle';
    })();
  }

  playModelTreatmentScenario() {
    this.distributionOutput = 1;
    (async () => {
      this.clientArray[1].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(200, 800));
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients';
      this.clientArray[1].state = 'computing';
      await this.delay(this.randomIntFromInterval(400, 2000));
      this.drawAuc2();
      this.clientArray[1].auc = this.randomIntFromInterval(60, 70) / 100
      this.slope = String(this.randomIntFromInterval(50, 220)/100);
      this.intercept = String(this.randomIntFromInterval(20, 230)/10);
      this.clientArray[1].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[1].state = 'idle';
      this.serverStatus = 'assigning tasks';
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients';
      this.clientArray[2].state = 'receiving application';
      this.clientArray[0].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.clientArray[2].state = 'computing';
      this.clientArray[0].state = 'computing';
      this.clientArray[2].auc = this.randomIntFromInterval(70, 80) / 100
      this.drawAuc3();
      this.clientArray[2].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 2000));
      this.clientArray[2].state = 'idle';
      this.clientArray[2].auc = this.randomIntFromInterval(70, 80) / 100
      this.drawAuc1();
      this.clientArray[0].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[0].state = 'idle';
      this.serverStatus = 'processing results';
      await this.delay(this.randomIntFromInterval(300, 3000));
      this.serverStatus = 'idle';
    })();
  }

  generateModelParams(){
    this.clientArray[0].auc = this.randomIntFromInterval(80, 90) / 100
    this.clientArray[1].auc = this.randomIntFromInterval(60, 70) / 100
    this.clientArray[2].auc = this.randomIntFromInterval(70, 80) / 100
    this.slope = String(this.randomIntFromInterval(50, 220)/100);
    this.intercept = String(this.randomIntFromInterval(20, 230)/10);
  }

  playOutModelScenario() {
    this.modelProcessed = true;
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  drawPieChart(canvas: any) {
    let ctx: any = canvas.getContext('2d');

    let myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['male', 'female'],
        datasets: [
          {
            label: 'Gender',
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ['#9A9A9A', '#51bcda'],
            borderWidth: 0,
            data: [263, 737]
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

        plugins: {
          labels: {
            render: 'percentage',
            fontSize: 16,
            fontColor: '#fff',
            showActualPercentages: true
          }
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: 'transparent',
                color: 'rgba(255,255,255,0.05)'
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: 'transparent'
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

  drawBars(canvas:any) {
    let ctx: any = canvas.getContext("2d");

    let myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          '30', '40', '50', '60', '70', '80'
        ],
        datasets: [
          {
            label: "Data",
            borderColor: "#51bcda",
            fill: true,
            backgroundColor: "#51bcda",
            hoverBorderColor: "#51bcda",
            borderWidth: 5,
            data: [6,	12,	22,	32,	21,	8]
          }
        ]
      },
      options: {
        plugins: {
          labels: {
            render: 'percentage',
            fontSize: 0,
            fontColor: '#fff',
            showActualPercentages: true
          }
        },

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

  drawLineChart(canvas:any) {
    let ctx: any = canvas.getContext("2d");

    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ['50','60','70','80','90','100','110', '120'],
        datasets: [
          {
            label: "Active Users",
            borderColor: "#51bcda",
            // backgroundColor: "#6bd000",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            borderWidth: 3,
            data: [100, 100, 100, 93, 50, 7, 0, 0]
          }, {
            label: "Active Users",
            borderColor: "#f5593d",
            // backgroundColor: "#6bd000",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            borderWidth: 3,
            data: [100, 100, 93, 57, 7, 0, 0, 0]
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
                maxTicksLimit: 10
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

  drawAucs() {
    this.drawAuc1()
    this.drawAuc2()
    this.drawAuc3()
  }
  
  drawAuc1(){
    this.drawAuc(
      'client1',
      '#6bd098',
      "rgba(107, 208, 152, 0.5)",
      [0, 0.7, 0.75, 0.8, 0.86, 0.9, 0.93, 0.95, 1.0, 1.0, 1.0]
    );
  }

  drawAuc2(){
    this.drawAuc(
      'client2',
      '#f5593d',
      "rgba(245, 89, 61, 0.5)",
      [0, 0.4, 0.55, 0.6, 0.66, 0.7, 0.83, 0.85, 0.9, 1.0, 1.0]
    );
  }

  drawAuc3(){
    this.drawAuc(
      'client3',
      '#51bcda',
      "rgba(81, 188, 218, 0.5)",
      [0, 0.58, 0.65, 0.7, 0.78, 0.8, 0.86, 0.90, 1.0, 1.0, 1.0]
    );
  }

  drawAuc(chartName:string, colorLine:string, colorBackground:string, lineData:Array<number>) {
    let canvas:any = document.getElementById(chartName);
    let ctx: any = canvas.getContext("2d");

    let myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        datasets: [
          {
            label: "Reference Line",
            borderColor: "rgba(0,0,0,0.5)",
            // backgroundColor: "#6bd000",
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: false,
            borderWidth: 1,
            lineWidth: 2,
            data: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
          },
          {
            label: "AUC",
            borderColor: colorLine,
            backgroundColor: colorBackground,
            pointRadius: 0,
            pointHoverRadius: 0,
            fill: true,
            borderWidth: 3,
            data: lineData
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
                maxTicksLimit: 20,
                display: false
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
                display: false,
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }
          ]
        }
      }
    });
  }
}
