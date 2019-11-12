import { Component, OnInit } from '@angular/core';

declare interface TableData {
  headerRow: string[];
  dataRows: string[][];
}

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public tableData1: TableData;

  constructor() { }

  ngOnInit() {
    this.tableData1 = {
      headerRow: [ '#', 'Name', 'Computation'],
      dataRows: [
          ['1', 'Andrew Mike', 'Develop'],
          ['2', 'John Doe', 'Design'],
          ['3', 'Alex Mike', 'Design'],
          ['4', 'Mike Monday', 'Marketing'],
          ['5', 'Paul Dickens', 'Communication']
      ]
  };
  }

}
