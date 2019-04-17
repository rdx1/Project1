import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReferalService {
  private nomineeurl="api/newnomination";

  constructor(private http:HttpClient) { }
  onSubmit(nomineedata)
  {
     return this.http.post<any>(this.nomineeurl,nomineedata);
  }

}
