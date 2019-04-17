import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersuccessService {
  customersuccessurl="api/customersuccess"
  deletecustomersuccessurl="api/deletecustsuccess"
  editcustomersuccessurl="api/editcustsuccess"

  constructor(private http:HttpClient) { }
  displaydetails(user){
    return this.http.post<any>(this.customersuccessurl,user)

  }
  deletecustomersuccess(user){
   return this.http.post<any>(this.deletecustomersuccessurl,user)

  }
  editcustomersuccess(user){
    return this.http.post<any>(this.editcustomersuccessurl,user)
  }

}
