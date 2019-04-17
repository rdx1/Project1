import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartserviceService {
  charturl = "api/chartdata"
  tableurl="api/tabledata"
  successcharturl="api/successchartdata"
  successtableurl="api/successtabledata"

  chartdata:any[] = []
  months: any[] = [
    { "month": "January", "company": "", "year": "" },
    { "month": "February", "company": "", "year": "" },
    { "month": "March", "company": "", "year": "" }
  ]

  constructor(private http: HttpClient) { }
  getchartdata(company) {
    for (let i = 0; i < this.months.length; i++) {
      this.months[i].company = company.customer
      this.months[i].year = company.year
      this.http.post<any>(this.charturl, this.months[i])
        .subscribe(
          res => {
            this.chartdata.push(JSON.stringify(res))
          },
          err => console.log(err)
        )
    }

  }
  getsuccesschartdata(company) {
    for (let i = 0; i < this.months.length; i++) {
      this.months[i].company = company.customer
      this.months[i].year = company.year
      this.http.post<any>(this.successcharturl, this.months[i])
        .subscribe(
          res => this.chartdata.push(JSON.stringify(res)),
          err => console.log(err)
        )
    }

  }
  gettabledetials(table){
   return this.http.post<any>(this.tableurl,table)
  }
  getsuccesstabledetials(table){
    return this.http.post<any>(this.successtableurl,table)
   }

}
