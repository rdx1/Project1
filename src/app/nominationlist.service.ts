import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NominationlistService {
  private nomineeurl="api/nominationdata"

  constructor(private http:HttpClient) { }
  
  userNomineeList(){
    return this.http.get<any>(this.nomineeurl)
  }
}
