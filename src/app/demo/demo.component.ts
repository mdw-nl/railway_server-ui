import { Component, OnInit } from '@angular/core';
import { BackendMockService } from 'app/backend-mock.service';
import { async } from '@angular/core/testing';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  public tableData1: TableData;

  selectedInput: String = 'age';
  selectedAnalysis: String = 'mean';
  computationResult: String = '';
  serverStatus: String = 'idle';

  constructor( public mock: BackendMockService) {
  }

  ngOnInit() {
    this.tableData1 = {
      headerRow: [ '#', 'Name', 'Job Position', 'Since', 'Salary', 'Actions'],
      dataRows: [
          ['1', 'Andrew Mike', 'Develop', '2013', '99,225',''],
          ['2', 'John Doe', 'Design', '2012', '89,241', ''],
          ['3', 'Alex Mike', 'Design', '2010', '92,144', ''],
          ['4', 'Mike Monday', 'Marketing', '2013', '49,990', ''],
          ['5', 'Paul Dickens', 'Communication', '2015', '69,201', '']
      ]
  };
  }

  onInputChange(value){
    console.log(" Value is : ", value );
    console.log(" Input variable : ", this.selectedInput)
    console.log(" Input variable : ", this.selectedAnalysis)
  }

  run(){
    this.computationResult='';
    this.serverStatus='assigning tasks';

    (async () => {
      this.mock.clientArray[0].state = 'receiving application'
      await this.delay(this.randomIntFromInterval(200, 800));
      this.mock.clientArray[2].state = 'receiving application'
      await this.delay(this.randomIntFromInterval(1000, 2000));
      this.serverStatus = 'waiting for clients'
      this.mock.clientArray[0].state = 'computing'
      this.mock.clientArray[2].state = 'computing'
      await this.delay(this.randomIntFromInterval(4000, 10000));
      this.mock.clientArray[0].state = 'sending results'
      await this.delay(this.randomIntFromInterval(200, 800));
      this.mock.clientArray[0].state = 'idle'
      await this.delay(this.randomIntFromInterval(200, 2000));
      this.mock.clientArray[2].state = 'sending results'
      await this.delay(this.randomIntFromInterval(200, 800));
      this.mock.clientArray[2].state = 'idle'
      this.serverStatus = 'processing results'
      await this.delay(this.randomIntFromInterval(4000, 10000));
      this.serverStatus = 'idle'
      this.computationResult= '42'
    })();
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
