import { Component, OnInit} from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(public authservice:AuthserviceService) { }

  ngOnInit() {
  }
  
}
