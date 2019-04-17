import { Component, OnInit } from '@angular/core';
import { SearchserviceService } from '../searchservice.service';
import { SearchdetailsService } from '../searchdetails.service';
import {  Router } from '@angular/router';
import { DboperationsService } from '../dboperations.service';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchterm = {
    "searchtext":""
  }
  searchdetails:any=[]
  public buttonvalue=[0]
  public searchlength:number


  constructor(private search: SearchserviceService,private getsearch:SearchdetailsService,private router:Router,private dboperations:DboperationsService,public authservice:AuthserviceService) { }

  ngOnInit() {
  }
  searchitem() {
    this.search.getsearchdetails(this.searchterm)
      .subscribe(
        res => {
          this.searchdetails=res,
          this.searchlength = this.searchdetails.length
          console.log(this.searchdetails)
        },
        err => console.log(err)
      )
  }
  getsearchdetails(i) {
    this.getsearch.displaysearchdetails(this.searchdetails[i])
    this.buttonvalue[i]=1;
}
sendsearchdetails(i){
  this.router.navigate(['home/search/searchdetails',this.searchdetails[i].transactionid])

}
ondelete(i) {
  this.dboperations.deleteDetails(this.searchdetails[i])
    .subscribe(
      res => {
        console.log(res),
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["home/search"]));
      },
      err => console.log(err)
    )
}

}
