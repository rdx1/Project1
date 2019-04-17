import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  private loggedurl="api/userdata"

  constructor(private http:HttpClient) { }
  isLoggedIn(){
    return this.http.get<any>(this.loggedurl)
  }

}
