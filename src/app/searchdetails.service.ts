import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { get } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class SearchdetailsService {
  searchitems:any={}
  customeritems:any={}
  contactitems:any={}
  custsuccess:any={}
  getsearchurl="api/getsearch"
  getcustomerurl="api/getsearchcustomer"
  getcontacturl="api/getsearchcontact"
  getcustomersuccessurl="api/getcustomersuccess"

  constructor(private http:HttpClient) { }

  displaysearchdetails(searchterm){
    this.http.post<any>(this.getsearchurl,searchterm)
    .subscribe(
      res => this.searchitems=res,
      err =>console.log(err)
    )
  }
  displaycustomer(searchterm){
    this.http.post(this.getcustomerurl,searchterm)
    .subscribe(
      res => this.customeritems=res,
      err =>console.log(err)
    )

  }
  displaycontacts(searchterm){
    this.http.post(this.getcontacturl,searchterm)
    .subscribe(
      res => this.contactitems=res,
      err =>console.log(err)
    )
  }
  displaycustomersuccess(searchterm){
    console.log(searchterm)
    this.http.post<any>(this.getcustomersuccessurl,searchterm)
    .subscribe(
      res => this.custsuccess=res,
      err =>console.log(err)
    )
  }
  

}
