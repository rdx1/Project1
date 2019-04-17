import { Component, OnInit } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { CustomerService } from '../customer.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent implements OnInit {
  uuid:string=UUID.UUID().substring(0,10);
  showstatus:boolean=false;
  public customerdetails={
    "customerid":this.uuid,
    "status":0,
    "phonenumber":"",
    "customername":"",
    "email":"",
    "industry":"",
    "address":""

    
  }
  industries = ['Hi-Tech', 'Automotive', 'Public Sector'];


  constructor(private customer:CustomerService,private toastr:ToastrService,private router:Router,public authservice:AuthserviceService) { }

  ngOnInit() {
  }
  postdetails(){
    this.customer.addCustomer(this.customerdetails)
    .subscribe(
      res => this.toastr.success('Saved Customer','Success!'),
      err => this.toastr.error('Error Saving','Error!')

    )
    this.customerdetails.status=1;
    this.customer.editcustomer(this.customerdetails)
    .subscribe()
    
  }
  deletecustomer(){
    this.customer.deletecustomer(this.customerdetails)
    .subscribe(
      res => {this.toastr.info('Deleted Customer','Delete Successful!'),
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(["home/leads"]));
    },
      err =>this.toastr.error('Error Saving','Error!')
    )
  }
  onCancel() {
    this.router.navigate(['/home/leads'])
  }
  editcustomer(){
  this.customer.editcustomer(this.customerdetails)
    .subscribe(
      res => this.toastr.info('Saved Customer!','Edit Successful!'),
      err =>this.toastr.error('Error Saving','Error!')
    )
  }

}
