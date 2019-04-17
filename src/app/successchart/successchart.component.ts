import { Component, OnInit } from '@angular/core';
import { ChartserviceService } from '../chartservice.service';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-successchart',
  templateUrl: './successchart.component.html',
  styleUrls: ['./successchart.component.css']
})
export class SuccesschartComponent implements OnInit {

  chartdata = {
    "customer":"",
    "year":""
  }
  chartitems = []
  showchart: boolean = false;
  tabledetails: [] = []

  constructor(private chartservice: ChartserviceService,public authservice:AuthserviceService) { }

  ngOnInit() {
  }
  getcharts() {
    this.chartservice.getsuccesschartdata(this.chartdata)
    this.chartitems = this.chartservice.chartdata
    this.showchart = true;
    this.chartservice.getsuccesstabledetials(this.chartdata)
      .subscribe(
        res => {
          console.log(res),
          this.tabledetails = res
        },
        err => console.log(err)
      )
  }
  public lineChartData = [
    { data: this.chartitems, label: 'Submissions' },
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March'];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ]
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  oncall(){
    console.log(JSON.stringify (this.chartitems))
    this.lineChartData[0]['data']=this.chartitems
      this.lineChartData=this.lineChartData.slice()
  
  
  }


}
