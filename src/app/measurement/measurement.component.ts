import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css']
})
export class MeasurementComponent implements OnInit {

  constructor(private authservice:AuthserviceService) { }

  ngOnInit() {
  }
  

}
