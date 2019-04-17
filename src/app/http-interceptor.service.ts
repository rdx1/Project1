import { Injectable,Injector } from '@angular/core';
import {HttpInterceptor} from'@angular/common/http'
import {AuthserviceService} from './authservice.service'


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private inject:Injector) { }
  intercept(req,next){
    let authservice=this.inject.get(AuthserviceService)
    let tokenenizedReq=req.clone({
      setHeaders:{
      Authorization:`Bearer ${authservice.getToken()}`
      }
    })
    return next.handle(tokenenizedReq)
  }

}
