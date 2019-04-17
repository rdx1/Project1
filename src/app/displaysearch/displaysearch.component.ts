import { Component, OnInit } from '@angular/core';
import { SearchdetailsService } from '../searchdetails.service';
import { Router } from '@angular/router';
import { DboperationsService } from '../dboperations.service';
import { ToastrService } from 'ngx-toastr';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { CustomerService } from '../customer.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FileService } from '../file.service';
import { TierserviceService } from '../tierservice.service';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-displaysearch',
  templateUrl: './displaysearch.component.html',
  styleUrls: ['./displaysearch.component.css']
})
export class DisplaysearchComponent implements OnInit {

searchdetails:any={}
public contactshow: boolean = false;
  public qualifyshow: boolean = false;
  public contactdetailshow: boolean = false;
  public transactionshow: boolean = false;
  public developshow: boolean = false;
  public createassetsshow: boolean = false;
  public buttonvalue: string = "fas fa-caret-down";
  public contactbuttonvalue: string = "fas fa-caret-down";
  public qualifybuttonvalue: string = "fas fa-caret-down";
  public transactionbuttonvalue: string = "fas fa-caret-down";
  public developbuttonvalue: string = "fas fa-caret-down";
  public createassetsbuttonvalue: string = "fas fa-caret-down";
  attachmentList: any = [];
  newtier1 = {
    "tier1": ""
  };
  newtier2 = {
    "tier2": ""
  };
  newtier3 = {
    "tier3": ""
  };
  modalRef: BsModalRef;
  tier1 = [];
  tier2 = [];
  tier3 = [];
  public showauto: number = 1;
  public showcontact: number = 1
  customers: any[] = [];
  contacts: any[] = [];
  customerdetails = {
    "customerid": "",
    "customername": '',
    "phonenumber": '',
    "address": "",
    "email": "",
    "industry": "",

  }
  contactdetails = {
    "contactid": '',
    "contactname": '',
    "contactphonenumber": '',
    "contactaddress": '',
    "jobfunction": '',
    "customerrelationship": '',
  }
  speccustomer = {
    "customername": "",
    "contactname": ""
  }
  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploads' });

  constructor(private search:SearchdetailsService,private router:Router,private dboperations:DboperationsService,private toastr:ToastrService,private customer: CustomerService,private fileService: FileService,private tierservice:TierserviceService,private modalService: BsModalService,private authservice:AuthserviceService) { }

  ngOnInit() 
  {  
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
    this.attachmentList.push(JSON.parse(response))
    this.searchdetails.nomineezip.unshift(this.attachmentList[0])
  }
    this.currentuser() 
    this.getCustomers()
    this.getContacts()
    this.gettier1()
    this.gettier2()
    this.gettier3()
    }
  
  currentuser() {
    
    this.searchdetails=this.search.searchitems
    this.attachmentList=this.searchdetails.nomineezip.slice()
    
  }
  contactToggle() {
    this.contactshow = !this.contactshow;
    if (this.contactshow) {
      this.contactbuttonvalue = "fas fa-caret-up";
    }
    else {
      this.contactbuttonvalue = "fas fa-caret-down";
    }

  }
  qualifyToggle() {
    this.qualifyshow = !this.qualifyshow;
    if (this.qualifyshow) {
      this.qualifybuttonvalue = "fas fa-caret-up";
    }
    else {
      this.qualifybuttonvalue = "fas fa-caret-down";
    }
  }
  contactdetailsToggle() {
    this.contactdetailshow = !this.contactdetailshow;
    if (this.contactdetailsToggle) {
      this.buttonvalue = "fas fa-caret-up";
    }
    else {
      this.buttonvalue = "fas fa-caret-down";
    }
  }
  transactiondetailsToggle() {
    this.transactionshow = !this.transactionshow;
    if (this.transactionshow) {
      this.transactionbuttonvalue = "fas fa-caret-up";
    }
    else {
      this.transactionbuttonvalue = "fas fa-caret-down";
    }
  }
  developToggle() {
    this.developshow = !this.developshow;
    if (this.developshow) {
      this.developbuttonvalue = "fas fa-caret-up";
    }
    else {
      this.developbuttonvalue = "fas fa-caret-down";
    }

  }
  createassetsToggle() {
    this.createassetsshow = !this.createassetsshow;
    if (this.createassetsshow) {
      this.createassetsbuttonvalue = "fas fa-caret-up";
    }
    else {
      this.createassetsbuttonvalue = "fas fa-caret-down";
    }
  }

  onDelete() {
    this.dboperations.deleteDetails(this.searchdetails)
      .subscribe(
        res => {
          this.toastr.error('Deleted','Delete Successful!')
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/nomination/search"]));
        },
        err => console.log(err)
      )
  }
  onUpdate() {
    this.dboperations.updateDetails(this.searchdetails)
    .subscribe(
      res =>this.toastr.info('Saved Nomination!','Edit Successful!'),
      err =>	this.toastr.error('Error Saving','Error!')
    )
  }
  getContacts() {
    this.customer.contacts()
      .subscribe(
        res => {
          this.contacts = res,
            console.log(this.contacts)
        },
        err => console.log(err)
      )
  }

  addcontactdetails(event: TypeaheadMatch): void {
    this.speccustomer = event.item
    this.customer.getspecificcontact(this.speccustomer)
      .subscribe(
        res => {
          console.log(res)
          this.contactdetails = res
          this.searchdetails.contactid = this.contactdetails.contactid
          this.searchdetails.contactname = this.contactdetails.contactname
          this.searchdetails.contactphonenumber = this.contactdetails.contactphonenumber
          this.searchdetails.contactaddress = this.contactdetails.contactaddress
          this.searchdetails.jobfunction = this.contactdetails.jobfunction
          this.searchdetails.customerrelationship = this.contactdetails.customerrelationship
        },
        err => console.log(err)
      )
  }
  getCustomers() {
    this.customer.customers()
      .subscribe(
        res => {
          this.customers = res,
            console.log(this.customers)
        },
        err => console.log(err)
      )
  }

  addcustomerdetails(event: TypeaheadMatch): void {
    this.speccustomer = event.item
    this.customer.getspecificcustomer(this.speccustomer)
      .subscribe(
        res => {
          console.log(res)
          this.customerdetails = res
          this.searchdetails.customerid=this.customerdetails.customerid
          this.searchdetails.customername = this.customerdetails.customername
          this.searchdetails.phonenumber = this.customerdetails.phonenumber
          this.searchdetails.address = this.customerdetails.address
          this.searchdetails.email = this.customerdetails.email
          this.searchdetails.industry = this.customerdetails.industry
        },
        err => console.log(err)
      )
  }
  removecustomer() {
    this.searchdetails.customerid = ''
    this.searchdetails.customername = ''
    this.searchdetails.phonenumber = ''
    this.searchdetails.address = ''
    this.searchdetails.email = ''
    this.searchdetails.industry = ''
    this.showauto = 0;

  }
  removecontact() {
    this.searchdetails.contactid = ''
    this.searchdetails.contactname = ''
    this.searchdetails.contactphonenumber = ''
    this.searchdetails.contactaddress = ''
    this.searchdetails.jobfunction = ''
    this.searchdetails.customerrelationship = ''
    this.showcontact = 0;

  }
  gettier1() {
    this.tierservice.tier1()
      .subscribe(
        res => {
          this.tier1 = res,
            console.log(this.tier1)
        },
        err => console.log(err)
      )
  }
  gettier2() {
    this.tierservice.tier2()
      .subscribe(
        res => {
          this.tier2 = res,
            console.log(this.tier2)
        },
        err => console.log(err)
      )
  }
  gettier3() {
    this.tierservice.tier3()
      .subscribe(
        res => {
          this.tier3 = res,
            console.log(this.tier3)
        },
        err => console.log(err)
      )
  }
  addtier1() {
    this.tierservice.addtier1(this.newtier1)
      .subscribe(
        res => {
          console.log(res),
            this.gettier1()
          this.newtier1.tier1 = '';
        },
        err => console.log(err)
      )
  }
  addtier2() {
    this.tierservice.addtier2(this.newtier2)
      .subscribe(
        res => {
          console.log(res),
            this.gettier2()
          this.newtier2.tier2 = '';
        },
        err => console.log(err)
      )
  }
  addtier3() {
    this.tierservice.addtier3(this.newtier3)
      .subscribe(
        res => {
          console.log(res),
            this.gettier3()
          this.newtier3.tier3 = '';
        },
        err => console.log(err)
      )
  }
  delete(i){
    this.attachmentList.splice(i,1)
    this.searchdetails.nomineezip.splice(i,1)
  }
  changeStatus() {
    this.searchdetails.status = 1;
    this.dboperations.updateDetails(this.searchdetails)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }
    

}

  


