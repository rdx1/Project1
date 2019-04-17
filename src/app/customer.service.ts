import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerurl="api/customer"
  private addcustomerurl="api/newcustomer"
  private specificurl="api/customerdetails"
  private contacturl="api/contact"
  private addcontacturl="api/newcontact"
  private contactitemurl="api/contactdetails"
  private deletecusturl="api/deletecustomer"
  private editcustomerurl="api/editcustomer"
  private deletecontactturl="api/deletecontact"
  private editcontacturl="api/editcontact"
  private nomurl="api/specificnominationdata"
  private nomineeurl="api/specificnomineedata"


  constructor(private http:HttpClient) { }
  customers(){
    return this.http.get<any>(this.customerurl)
 
   }
   addCustomer(role){
     console.log(role)
     return this.http.post(this.addcustomerurl,role)
   }
   getspecificcustomer(user){
     console.log(user)
     return this.http.post<any>(this.specificurl,user)
   }
   deletecustomer(user){
     return this.http.post(this.deletecusturl,user)
   }
   editcustomer(user){
     return this.http.post<any>(this.editcustomerurl,user)

   }
   contacts(){
    return this.http.get<any>(this.contacturl)
 
   }
   addContact(role){
     return this.http.post<any>(this.addcontacturl,role)
   }
   deletecontact(user){
    return this.http.post<any>(this.deletecontactturl,user)
  }
  editcontact(user){
    return this.http.post(<any>this.editcontacturl,user)
  }
   getspecificcontact(user){
     return this.http.post<any>(this.contactitemurl,user)
   }
   getspecificnomination(){
     return this.http.get<any>(this.nomurl)
   }
   getspecificnominee(user){
    return this.http.post<any>(this.nomineeurl,user)
   }
   


}
