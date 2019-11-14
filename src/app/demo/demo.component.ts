import { Component, OnInit } from '@angular/core';
import { BackendMockService } from 'app/backend-mock.service';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Chart from 'chart.js';
import { Router } from '@angular/router';

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

  selectedDataset: String = 'all';
  selectedInput: String = 'age';
  selectedAnalysis: String = 'mean';
  closeResult: string;
  canvas
  ctx

  constructor(
    public mock: BackendMockService,
    private modalService: NgbModal,
    public router: Router
  ) {}

  ngOnInit() {
    this.initCharts();
    this.drawCharts();
  }

  onInputChange(value) {
    console.log(' Value is : ', value);
    console.log(' Input variable : ', this.selectedInput);
    console.log(' Input variable : ', this.selectedAnalysis);
    this.drawCharts();
  }

  goToResults(){
    this.router.navigate(['/about'])
  }

  // ---------- MODEL STUFF ------------------------
  open(content, type) {
    if (type === 'sm') {
      console.log('aici');
      this.modalService.open(content, { size: 'sm' }).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    } else {
      this.modalService.open(content).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // ---------- MODEL STUFF END --------------------
  drawCharts() {
    let firstClient = this.mock.clientArray[0].dataArray.find(clientData => clientData.variable === this.selectedInput)
    this.drawChart(
      'chart1',
      ['#6bd098', '#f4f3ef'],
      firstClient.usable,
      firstClient.total
    );
    let secondClient = this.mock.clientArray[1].dataArray.find(clientData => clientData.variable === this.selectedInput)
    this.drawChart(
      'chart2',
      ['#6bd098', '#f4f3ef'],
      secondClient.usable,
      secondClient.total
    );
    let thirdClient = this.mock.clientArray[2].dataArray.find(clientData => clientData.variable === this.selectedInput)
    this.drawChart(
      'chart3',
      ['#6bd098', '#f4f3ef'],
      thirdClient.usable,
      thirdClient.total
    );
  }

  initCharts() {
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        if (chart.config.options.elements.center) {
          //Get ctx from string
          var ctx = chart.chart.ctx;

          //Get options from the center object in options
          var centerConfig = chart.config.options.elements.center;
          var fontStyle = centerConfig.fontStyle || 'Arial';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var sidePadding = centerConfig.sidePadding || 20;
          var sidePaddingCalculated =
            (sidePadding / 100) * (chart.innerRadius * 2);
          //Start with a base font of 30px
          ctx.font = '30px ' + fontStyle;

          //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = chart.innerRadius * 2;

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight);

          //Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.font = fontSizeToUse + 'px ' + fontStyle;
          ctx.fillStyle = color;

          //Draw text in center
          ctx.fillText(txt, centerX, centerY);
        }
      }
    });
  }

  drawChart(
    chartName: string,
    colorArray: string[],
    value: number,
    total: number
  ) {
    this.canvas = document.getElementById(chartName);
    console.log(JSON.stringify(this.canvas));
    this.ctx = this.canvas.getContext('2d');
    //let sum = data.reduce((a, b) => a + b, 0)
    let restPie = total - value;

    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: ['Found', 'Total'],
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: colorArray,
            borderWidth: 0,
            data: [value, restPie]
          }
        ]
      },
      options: {
        elements: {
          center: {
            text: String(Math.round((value / total) * 100)) + '%',
            color: '#66615c', // Default is #000000
            fontStyle: 'Arial', // Default is Arial
            sidePadding: 60 // Defualt is 20 (as a percentage)
          }
        },
        cutoutPercentage: 90,
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
