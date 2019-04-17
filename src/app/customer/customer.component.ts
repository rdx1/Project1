import { Component, OnInit, ElementRef,AfterViewInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit,AfterViewInit {

  constructor(private elementRef: ElementRef,public authservice:AuthserviceService) { }

  ngOnInit() {
  }
  ngAfterViewInit(){
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#9c9ae2';
 }

}
