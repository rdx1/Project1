import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  private loginUrl="api/login"
  private registerUrl="api/register"


  constructor(private http:HttpClient, private router:Router) {

   }
   login(user){
      return this.http.post<any>(this.loginUrl,user);
   }
   isUser()
   {
     return !!localStorage.getItem('token')
   }
   getToken(){
     return localStorage.getItem('token');
   }
   logout(){
     localStorage.removeItem('token')
     this.router.navigate([''])
   }
   register(user){
     return this.http.post<any>(this.registerUrl,user)
   }
}
