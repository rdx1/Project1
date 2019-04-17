import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NominationviewService {
  nominationviewurl="api/nominationview"

  constructor(private http:HttpClient) { }
  Nominationdetails(){
    return this.http.get(this.nominationviewurl)
  }
}
