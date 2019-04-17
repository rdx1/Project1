import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DboperationsService {
 updateurl='api/updatenominee'
private deleteurl='api/deletenominee'

  constructor(private http:HttpClient) { }

  updateDetails(updatedetails){
    return this.http.put(this.updateurl,updatedetails)
  }

  deleteDetails(deletedetails){
   return this.http.post<any>(this.deleteurl,deletedetails)
   
  }

}
