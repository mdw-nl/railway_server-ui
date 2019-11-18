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
  lastOnline: String;
  user: String;
  mappedVariables: Array<String>;
  ip: String;
  email: String;
  institute: String;
  photo: String;
  chartId: string;
  dataArray: Array<ClientData> = new Array<ClientData>();
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
  serverStatus: String = 'idle';
  IDLE: String = 'idle';
  modelProcessed = false;

  resultProfile;
  resultGraph: Array<ResultsGraph>;

  meanOutput = 0;
  distributionOutput = 0;
  sampleSize = 0;

  constructor() {
    this.generateClients();
  }

  generateClients() {
    let ClientInfo1: ClientInfo = new ClientInfo();
    ClientInfo1.id = 'MAASTRO'; //"silly-goose-37";
    ClientInfo1.status = 'online';
    ClientInfo1.state = 'idle';
    ClientInfo1.lastOnline = '1s';
    ClientInfo1.mappedVariables = ['Age', 'Gender', 'RadiationDose'];
    ClientInfo1.ip = '192.186.0.100';
    ClientInfo1.email = 'tim.lustberg@medicaldataworks.nl';
    ClientInfo1.user = 'Tim';
    ClientInfo1.photo = './assets/img/timl.svg';
    ClientInfo1.institute = 'Lustberg Clinics';
    ClientInfo1.chartId = 'chart1';

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
    ClientInfo2.lastOnline = '5s';
    ClientInfo2.mappedVariables = ['Gender', 'Radiation Dose', 'Survival'];
    ClientInfo2.ip = '192.186.0.101';
    ClientInfo2.email = 'tim.hendriks@medicaldataworks.nl';
    ClientInfo2.user = 'Tim';
    ClientInfo2.photo = './assets/img/timh.svg';
    ClientInfo2.institute = 'Hendriks Clinics';
    ClientInfo2.chartId = 'chart2';

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
    ClientInfo3.chartId = 'chart3';

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
      this.playOutMeanScenario();
    }
    if (this.computation === 'distribution') {
      this.playOutDistributionScenario(canvas);
    }
  }

  playOutMeanScenario() {
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
      await this.delay(this.randomIntFromInterval(4000, 10000));
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
      await this.delay(this.randomIntFromInterval(1000, 4000));
      this.serverStatus = 'idle';
      this.meanOutput = 63.5 //this.randomIntFromInterval(500, 1000) / 10;
    })();
  }

  playOutDistributionScenario(canvas: any) {
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
      await this.delay(this.randomIntFromInterval(4000, 10000));
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
      await this.delay(this.randomIntFromInterval(3000, 4000));
      this.serverStatus = 'idle';
      this.drawPieChart(canvas);
    })();
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
            data: [542, 480]
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
}
