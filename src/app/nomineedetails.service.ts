import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NomineedetailsService {
  private detailsurl="api/getdetails"
  singlenomineedetails:any={};


  constructor(private http:HttpClient) { }
  getdetails(nominee){
    this.http.post<any>(this.detailsurl,nominee)
    .subscribe(
      res =>  {
        this.singlenomineedetails=res
        console.log(this.singlenomineedetails)

    },
      err => console.log(err)

    )
  }
}
