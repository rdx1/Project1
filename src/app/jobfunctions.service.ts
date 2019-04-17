import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobfunctionsService {
  private jobfunctionurl="api/jobfunctions"
  private addurl="api/newjobfunction"
  

  constructor(private http:HttpClient) { }
  jobfunctions(){
   return this.http.get<any>(this.jobfunctionurl)

  }
  addjobfunc(role){
    return this.http.post(this.addurl,role)
  }
}
