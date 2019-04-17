import { Component, OnInit, OnDestroy } from '@angular/core';
import { NominationlistService } from '../nominationlist.service';
import { Nominate } from '../nominate';
import { Subscription } from 'rxjs';
import { AuthserviceService } from '../authservice.service';
import { NomineedetailsService } from '../nomineedetails.service';
import { Router } from '@angular/router';
import { DboperationsService } from '../dboperations.service';
import { GetuserService } from '../getuser.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-homenomination',
  templateUrl: './homenomination.component.html',
  styleUrls: ['./homenomination.component.css']

})
export class HomenominationComponent implements OnInit {
  nominees: any = [];
  public nomineedel = {
    "transactionid": ""
  }
  public nomineelength: any
  public buttonvalue = [0]
  public cancelbutton = [0]
  subscription: any;
  public name;
  constructor(private usernomlist: NominationlistService, private authservice: AuthserviceService, private nom: NomineedetailsService, private router: Router, private dboperations: DboperationsService, private userdata: GetuserService,private toastr:ToastrService) { }

  ngOnInit() {
    this.subscription = this.usernomlist.userNomineeList()
      .subscribe(
        res => {
          this.nominees = res
          this.nomineelength = this.nominees.length
        },
        err => console.log(err)
      )
      this.getname()

  }
  nomineedetails(nominee, i) {
    this.nom.getdetails(nominee)
    this.buttonvalue[i] = 1;
    this.cancelbutton[i] = 1;
  }
  sendnomineedetails(i) {
    this.router.navigate(['home/nomination/nominationdetails',this.nominees[i].transactionid])

  }
  ondelete(i) {
    this.nomineedel = { transactionid: this.nominees[i].transactionid }
    this.dboperations.deleteDetails(this.nomineedel)
      .subscribe(
        res => {
          this.toastr.info('Deleted Nominee!','Delete SUccesful'),
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/nomination"]));
        },
        err => console.log(err)
      )
  }
  getname() {
    this.userdata.getname()
      .subscribe(
        res => this.name = res,
        err => console.log(err)
      )
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()

  }





}
