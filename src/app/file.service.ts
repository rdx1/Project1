import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private _http:HttpClient) { }
  downloadFile(file:String){
    var body = {filepath:file};

    return this._http.post('api/download',body,{
        responseType : 'blob',
        headers:new HttpHeaders().append('Content-Type','application/json')
    });
}
}
