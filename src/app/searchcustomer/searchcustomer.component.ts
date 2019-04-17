import { Component, OnInit } from '@angular/core';
import { SearchserviceService } from '../searchservice.service';
import { SearchdetailsService } from '../searchdetails.service';
import { Router } from '@angular/router';
import { DboperationsService } from '../dboperations.service';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-searchcustomer',
  templateUrl: './searchcustomer.component.html',
  styleUrls: ['./searchcustomer.component.css']
})
export class SearchcustomerComponent implements OnInit {

  searchterm = {}
  searchdetails: any = []
  buttonvalue=[0]
  public searchlength:number

  constructor(private search: SearchserviceService, private getsearch: SearchdetailsService,private router:Router,private dboperations:DboperationsService,private authservice:AuthserviceService) { }

  ngOnInit() {
  }
  searchitem(searchterm) {
    this.search.getcustomerdetails(this.searchterm)
      .subscribe(
        res => {
          console.log(res),
            this.searchdetails = res,
            this.searchlength = this.searchdetails.length
        },
        err => console.log(err)
      )
  }
  getsearchdetails(i) {
    this.getsearch.displaycustomer(this.searchterm)
    this.buttonvalue[i] = 1;
  }
  sendsearchdetails(i) {
    this.router.navigate(['home/leads/searchcustomer/customerdetails',this.searchdetails[i].customerid])

  }
  ondelete(i) {
    console.log(this.searchdetails[i])
    this.dboperations.deleteDetails(this.searchdetails[i])
      .subscribe(
        res => {
          console.log(res),
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/leads/searchcustomer"]));
        },
        err => console.log(err)
      )
   }

}

