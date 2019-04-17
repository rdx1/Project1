import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchcontactComponent } from './searchcontact/searchcontact.component';

@Injectable({
  providedIn: 'root'
})
export class SearchserviceService {
  searchurl="api/search"
  Searchcontacts="api/searchcontact"
  searchcustomers="api/searchcustomer"
  searchcustomersuccess="api/searchcustomersuccess"

  constructor(private http:HttpClient) { }
  getsearchdetails(searchitem){
    return this.http.post<any>(this.searchurl,searchitem)
  }
  getcontactdetails(user){
    return this.http.post(this.Searchcontacts,user)

  }
  getcustomerdetails(user){
    return this.http.post(this.searchcustomers,user)
  }
  getcutsomersuccess(user){
    return this.http.post<any>(this.searchcustomersuccess,user)

  }
}

