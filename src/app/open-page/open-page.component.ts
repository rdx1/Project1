import { Component, OnInit,AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { GetuserService } from '../getuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-page',
  templateUrl: './open-page.component.html',
  styleUrls: ['./open-page.component.css']
})
export class OpenPageComponent implements OnInit {

  constructor(public authservice:AuthserviceService,private userdata:GetuserService,private elementRef: ElementRef,private router:Router) { }
  adminstatus;
  public name;

  ngOnInit() {
    this.getuser()
    this.getname()
    
  }
  getuser(){
    this.userdata.getadmin()
    .subscribe(
      res =>this.adminstatus=res,
      err => console.log(err)
    )
  }
  register(){
    this.router.navigate(['/home/register'])
  }
  getname(){
    this.userdata.getname()
    .subscribe(
      res =>this.name=res,
      err =>console.log(err)
    )
  }

}
