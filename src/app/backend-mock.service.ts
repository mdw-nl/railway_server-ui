import { Injectable } from '@angular/core';

class ClientData {
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
}

@Injectable({
  providedIn: 'root'
})
export class BackendMockService {

  clientArray: Array<ClientData> = new Array<ClientData>();

  constructor() {
    this.generateClients()
  }

  generateClients() {
    let clientData1: ClientData = new ClientData();
    clientData1.id = 'silly-goose-37'
    clientData1.status = 'online'
    clientData1.state = 'idle'
    clientData1.lastOnline = '1s'
    clientData1.mappedVariables = ['Age', 'Gender', 'RadiationDose'];
    clientData1.ip = '192.186.0.100'
    clientData1.email = 'tim.lustberg@medicaldataworks.nl'
    clientData1.user = 'Tim'
    clientData1.photo = './assets/img/tim1.svg'
    clientData1.institute = 'Lustberg Clinics'

    let clientData2: ClientData  = new ClientData();
    clientData2.id = 'quick-cobra-15'
    clientData2.status = 'online'
    clientData2.state = 'idle'
    clientData2.lastOnline = '5s'
    clientData2.mappedVariables = ['Gender', 'Radiation Dose', 'Survival'];
    clientData2.ip = '192.186.0.101'
    clientData2.email = 'tim.hendriks@medicaldataworks.nl'
    clientData2.user = 'Tim'
    clientData2.photo = './assets/img/tim2.svg'
    clientData2.institute = 'Hendriks Clinics'

    let clientData3: ClientData  = new ClientData();
    clientData3.id = 'tricky-chicken-23'
    clientData3.status = 'online'
    clientData3.state = 'idle'
    clientData3.lastOnline = '3s'
    clientData3.mappedVariables = ['Age', 'Gender', 'Radiation Dose', 'Survival'];
    clientData3.ip = '192.186.0.101'
    clientData3.email = 'johan.vansoest@medicaldataworks.nl'
    clientData3.user = 'Johan'
    clientData3.photo = './assets/img/johan.svg'
    clientData3.institute = 'VanSoest Clinics'

    this.clientArray.push(clientData1);
    this.clientArray.push(clientData2);
    this.clientArray.push(clientData3);
  }

  averagePerfromStory(){

  }
}
