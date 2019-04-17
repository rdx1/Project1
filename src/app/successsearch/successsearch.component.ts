import { Component, OnInit } from '@angular/core';
import { SearchserviceService } from '../searchservice.service';
import { SearchdetailsService } from '../searchdetails.service';
import { Router } from '@angular/router';
import { DboperationsService } from '../dboperations.service';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-successsearch',
  templateUrl: './successsearch.component.html',
  styleUrls: ['./successsearch.component.css']
})
export class SuccesssearchComponent implements OnInit {

  searchterm = {}
  searchdetails: any = []
  public searchlength: number
  buttonvalue = [0]

  constructor(private search: SearchserviceService, private getsearch: SearchdetailsService, private router: Router, private dboperations: DboperationsService,private authservice:AuthserviceService) { }

  ngOnInit() {
  }
  searchitem(searchterm) {
    this.search.getcutsomersuccess(this.searchterm)
      .subscribe(
        res => {
          console.log(res),
            this.searchdetails = res
          this.searchlength = this.searchdetails.length
        },
        err => console.log(err)
      )
  }
  getsearchdetails(i) {
    this.getsearch.displaycustomersuccess(this.searchdetails[i])
    this.buttonvalue[i] = 1;
  }
  sendsearchdetails(i) {
    this.router.navigate(['home/successmeasure/search/customersuccessdetails',this.searchdetails[i].measurementid])

  }
  ondelete(i) {
    console.log(this.searchdetails[i])
    this.dboperations.deleteDetails(this.searchdetails[i])
      .subscribe(
        res => {
          console.log(res),
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/successmeaure/search"]));
        },
        err => console.log(err)
      )


  }



}
