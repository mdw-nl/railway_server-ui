import { Injectable } from '@angular/core';

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
    dataArray: Array<ClientData> = new Array<ClientData> ();
}

@Injectable({
  providedIn: 'root'
})
export class BackendMockService {

  clientArray: Array<ClientInfo> = new Array<ClientInfo>();
  user = 'user'
  userPhoto:String  = './assets/img/default.svg'
  computationResult: String = '';
  serverStatus: String = 'idle';
  IDLE: String = 'idle';
  processingDone = false;

  constructor() {
    this.generateClients()
  }

  generateClients() {
    let ClientInfo1: ClientInfo = new ClientInfo();
    ClientInfo1.id = 'silly-goose-37'
    ClientInfo1.status = 'online'
    ClientInfo1.state = 'idle'
    ClientInfo1.lastOnline = '1s'
    ClientInfo1.mappedVariables = ['Age', 'Gender', 'RadiationDose'];
    ClientInfo1.ip = '192.186.0.100'
    ClientInfo1.email = 'tim.lustberg@medicaldataworks.nl'
    ClientInfo1.user = 'Tim'
    ClientInfo1.photo = './assets/img/timl.svg'
    ClientInfo1.institute = 'Lustberg Clinics'
    ClientInfo1.chartId = 'chart1';

    let age = new ClientData();
    age.variable = 'age';
    age.usable =231;
    age.total = 354;
    let gender = new ClientData();
    gender.variable = 'gender';
    gender.usable =0;
    gender.total = 354;
    let treatment = new ClientData();
    treatment.variable = 'treatment';
    treatment.usable =354;
    treatment.total = 354;
    ClientInfo1.dataArray.push(age);
    ClientInfo1.dataArray.push(gender);
    ClientInfo1.dataArray.push(treatment);

    let ClientInfo2: ClientInfo  = new ClientInfo();
    ClientInfo2.id = 'quick-cobra-15'
    ClientInfo2.status = 'online'
    ClientInfo2.state = 'idle'
    ClientInfo2.lastOnline = '5s'
    ClientInfo2.mappedVariables = ['Gender', 'Radiation Dose', 'Survival'];
    ClientInfo2.ip = '192.186.0.101'
    ClientInfo2.email = 'tim.hendriks@medicaldataworks.nl'
    ClientInfo2.user = 'Tim'
    ClientInfo2.photo = './assets/img/timh.svg'
    ClientInfo2.institute = 'Hendriks Clinics'
    ClientInfo2.chartId = 'chart2';

    let age2 = new ClientData();
    let treatment2 = new ClientData();
    let gender2 = new ClientData();
    age2.variable = 'age';
    age2.usable =1354;
    age2.total = 1354;
    gender2.variable = 'gender';
    gender2.usable =1354;
    gender2.total = 1354;
    treatment2.variable = 'treatment';
    treatment2.usable =854;
    treatment2.total = 1354;
    ClientInfo2.dataArray.push(age2);
    ClientInfo2.dataArray.push(gender2);
    ClientInfo2.dataArray.push(treatment2);

    let ClientInfo3: ClientInfo  = new ClientInfo();
    ClientInfo3.id = 'tricky-chicken-23'
    ClientInfo3.status = 'online'
    ClientInfo3.state = 'idle'
    ClientInfo3.lastOnline = '3s'
    ClientInfo3.mappedVariables = ['Age', 'Gender', 'Radiation Dose', 'Survival'];
    ClientInfo3.ip = '192.186.0.101'
    ClientInfo3.email = 'johan.vansoest@medicaldataworks.nl'
    ClientInfo3.user = 'Johan'
    ClientInfo3.photo = './assets/img/johan.svg'
    ClientInfo3.institute = 'VanSoest Clinics'
    ClientInfo3.chartId = 'chart3';

    let age3 = new ClientData();
    let treatment3 = new ClientData();
    let gender3 = new ClientData();
    age3.variable = 'age';
    age3.usable =1231;
    age3.total = 2354;
    gender3.variable = 'gender';
    gender3.usable =2034;
    gender3.total = 2354;
    treatment3.variable = 'treatment';
    treatment3.usable =1354;
    treatment3.total = 2354;
    ClientInfo3.dataArray.push(age3);
    ClientInfo3.dataArray.push(gender3);
    ClientInfo3.dataArray.push(treatment3);

    this.clientArray.push(ClientInfo1);
    this.clientArray.push(ClientInfo2);
    this.clientArray.push(ClientInfo3);
  }

  startFakeRun() {
    this.computationResult = '';
    this.serverStatus = 'assigning tasks';

    (async () => {
      this.clientArray[0].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[2].state = 'receiving application';
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients';
      this.clientArray[0].state = 'computing';
      this.clientArray[2].state = 'computing';
      await this.delay(this.randomIntFromInterval(4000, 10000));
      this.clientArray[0].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[0].state = 'idle';
      await this.delay(this.randomIntFromInterval(200, 2000));
      this.clientArray[2].state = 'sending results';
      await this.delay(this.randomIntFromInterval(200, 800));
      this.clientArray[2].state = 'idle';
      this.serverStatus = 'processing results';
      await this.delay(this.randomIntFromInterval(4000, 10000));
      this.serverStatus = 'idle';
      this.processingDone = true;
    })();
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
