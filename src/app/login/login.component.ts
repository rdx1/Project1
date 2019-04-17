import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../authservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users={};
  logindata={};
  errorbutton=0;


  constructor(private authservice:AuthserviceService,private router:Router) { }

  ngOnInit() {
  }
  onLogin(){
    this.authservice.login(this.users)
    .subscribe(res => {
      console.log(res)
      localStorage.setItem('token',res.token)
      this.router.navigate(['/home']);


    },
    err => {
      if(err.status===200){
      this.errorbutton=1;
      }else{
        this.errorbutton=2;
      }
    }
      )
    
  }

  

  

}
