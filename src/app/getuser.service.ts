import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetuserService {
  private getadminurl="api/useradmindata"
  private getnameurl="api/usernamedata"

  constructor(private http:HttpClient) { }
  getadmin(){
    return this.http.get<any>(this.getadminurl)

  }
  getname(){
    return this.http.get<any>(this.getnameurl)
  }
}
