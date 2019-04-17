import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TierserviceService {

  private tier1url = "api/tier1"
  private tier2url = "api/tier2"
  private tier3url = "api/tier3"
  private addtier1url = "api/newtier1"
  private addtier2url = "api/newtier2"
  private addtier3url = "api/newtier3"


  constructor(private http: HttpClient) { }
  tier1() {
    return this.http.get<any>(this.tier1url)

  }
  tier2() {
    return this.http.get<any>(this.tier2url)

  }
  tier3() {
    return this.http.get<any>(this.tier3url)

  }
  addtier1(role) {
    return this.http.post(this.addtier1url, role)
  }
  addtier2(role) {
    return this.http.post(this.addtier2url, role)
  }
  addtier3(role) {
    return this.http.post(this.addtier3url, role)
  }
  
}