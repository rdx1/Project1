import { Component, OnInit } from '@angular/core';
import { SearchdetailsService } from '../searchdetails.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-displaycustomersearch',
  templateUrl: './displaycustomersearch.component.html',
  styleUrls: ['./displaycustomersearch.component.css']
})
export class DisplaycustomersearchComponent implements OnInit {
  searchdetails:any={}
  industries = ['Hi-Tech', 'Automotive', 'Public Sector'];
  constructor(private search:SearchdetailsService,private toastr:ToastrService,private customer:CustomerService,private router:Router,private authservice:AuthserviceService) { }

  ngOnInit() {
    this.currentuser()
  }
  currentuser() {
    
    this.searchdetails=this.search.customeritems
    console.log(this.searchdetails)
    }
  deletecustomer(){
    this.customer.deletecustomer(this.searchdetails)
    .subscribe(
      res => {this.toastr.info('Deleted Customer','Delete Successful!'),
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(["home/leads/searchcustomer"]));
    },
      err =>this.toastr.error('Error Saving','Error!')
    )
  }
  editcustomer(){
  this.customer.editcustomer(this.searchdetails)
    .subscribe(
      res => this.toastr.info('Saved Customer!','Edit Successful!'),
      err =>this.toastr.error('Error Saving','Error!')
    )
  }

}
