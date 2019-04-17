import { Component, OnInit, TemplateRef } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { ReferalService } from '../referal.service';
import { LoginuserService } from '../loginuser.service';
import { AuthserviceService } from '../authservice.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { FileService } from '../file.service';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
import { DboperationsService } from '../dboperations.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from '../customer.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { ToastrService } from 'ngx-toastr';
//import { BsModalService } from 'ngx-bootstrap/modal/public_api';
import { TierserviceService } from '../tierservice.service';
import { GetuserService } from '../getuser.service';

@Component({
  selector: 'app-nomination',
  templateUrl: './nomination.component.html',
  styleUrls: ['./nomination.component.css']
})
export class NominationComponent implements OnInit {

  public contactshow: boolean = false;
  public showsecondbutton: boolean = false;
  public showfirstbutton: boolean = true;
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
  public uuid: string = UUID.UUID().substring(0,10);
  public newdate = new Date()
  public showdownloads: boolean = false;
  public afterdownloads = 0;
  public showauto: number = 0;
  public showcontact: number = 0
  monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"]
  public dateObj = new Date();
  public month =this.monthNames[this.dateObj.getUTCMonth()]; //months from 1-12
  public day = this.dateObj.getUTCDate();
  public year = this.dateObj.getUTCFullYear(); 
  public name;

  public showsstatus: boolean = false;
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
  public notshown = false;
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
  attachmentList: any = [];
  public nomineedel = {
    "customerid": ""
  }
  public loggeduser: string
  referalmodel = {
    "customerid": "",
    "loginid": '',
    "customername": '',
    "phonenumber": '',
    "address": '',
    "email": "",
    "industry": "",
    "contactid": "",
    "contactname": "",
    "contactphonenumber": "",
    "contactaddress": "",
    "jobfunction": "",
    "customerrelationship": "",
    "transactionid": this.uuid,
    "day": this.day,
    "month": this.month,
    "year": this.year,
    "createdby": "",
    "description": "",
    "custcall": false,
    "custmarket": false,
    "customerdigital": false,
    "nomineezip": [],
    "notes": "",
    "developcustomercontact": "",
    "developjobfunction": "",
    "status": 0,
    "tier1": "",
    "tier2": "",
    "tier3": ""
  }

  //file upload
  uploader: FileUploader = new FileUploader({ url: 'api/uploads' });

  constructor(private referal: ReferalService, private loginuser: LoginuserService, public authservice: AuthserviceService, private fileService: FileService, private router: Router, private dboperations: DboperationsService, private customer: CustomerService, private toastr: ToastrService, private modalService: BsModalService, private tierservice: TierserviceService,private userdata:GetuserService) {
  }
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response))
      this.referalmodel.nomineezip.unshift(this.attachmentList[0])
    }
    this.loginuser.isLoggedIn()
      .subscribe(
        res => {
          this.referalmodel.loginid = res
          console.log(this.referalmodel.loginid)
        },
        err => console.log(err)
      )
    this.getCustomers()
    this.getContacts()
    this.gettier1()
    this.gettier2()
    this.gettier3()
    this.getname()

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
  onSubmit() {
    this.referal.onSubmit(this.referalmodel)
      .subscribe(
        res => this.toastr.success('Details Saved', 'Save Successful!'),
        err => console.log(err)

      )
    this.showsecondbutton = true;
    this.showfirstbutton = false;
  }
  download(i) {
    var filename = this.attachmentList[i].filepath;
    console.log(this.attachmentList[i].filepath)

    this.fileService.downloadFile(filename)
      .subscribe(
        data => saveAs(data, filename),
        error => console.error(error)
      );
  }
  onCancel() {
    this.router.navigate(['/home/nomination'])
  }
  changeStatus() {
    this.referalmodel.status = 1;
    this.afterdownloads = 2;
    this.dboperations.updateDetails(this.referalmodel)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    this.showsecondbutton = false
  }
  onDelete() {
    console.log(this.referalmodel.customerid)
    this.nomineedel = { customerid: this.referalmodel.customerid }
    this.dboperations.deleteDetails(this.nomineedel)
      .subscribe(
        res => {
          this.toastr.error('Deleted', 'Delete Successful!')
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(["home/nomination"]));
        },
        err => console.log(err)
      )
  }
  onUpdate() {
    this.dboperations.updateDetails(this.referalmodel.customerid)
      .subscribe(
        res => this.toastr.info('Saved Nomination!', 'Edit Successful!'),
        err => this.toastr.error('Error Saving', 'Error!')
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
          this.referalmodel.customerid = this.customerdetails.customerid
          this.referalmodel.customername = this.customerdetails.customername
          this.referalmodel.phonenumber = this.customerdetails.phonenumber
          this.referalmodel.address = this.customerdetails.address
          this.referalmodel.email = this.customerdetails.email
          this.referalmodel.industry = this.customerdetails.industry
          this.showauto = 1;
        },
        err => console.log(err)
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
          this.referalmodel.contactid = this.contactdetails.contactid
          this.referalmodel.contactname = this.contactdetails.contactname
          this.referalmodel.contactphonenumber = this.contactdetails.contactphonenumber
          this.referalmodel.contactaddress = this.contactdetails.contactaddress
          this.referalmodel.jobfunction = this.contactdetails.jobfunction
          this.referalmodel.customerrelationship = this.contactdetails.customerrelationship
          this.showcontact = 1;
        },
        err => console.log(err)
      )
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  addmodal(template: TemplateRef<any>) {
    switch (this.referalmodel.tier1) {
      case "addnew": {
        this.openModal(template)
      }
    }
  }
  addmodal2(template: TemplateRef<any>) {
    switch (this.referalmodel.tier2) {
      case "addnew": {
        this.openModal(template)
      }
    }
  }
  addmodal3(template: TemplateRef<any>) {
    switch (this.referalmodel.tier3) {
      case "addnew": {
        this.openModal(template)
      }
    }
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
  removecustomer() {
    this.referalmodel.customerid = ''
    this.referalmodel.customername = ''
    this.referalmodel.phonenumber = ''
    this.referalmodel.address = ''
    this.referalmodel.email = ''
    this.referalmodel.industry = ''
    this.showauto = 0;

  }
  removecontact() {
    this.referalmodel.contactid = ''
    this.referalmodel.contactname = ''
    this.referalmodel.contactphonenumber = ''
    this.referalmodel.contactaddress = ''
    this.referalmodel.jobfunction = ''
    this.referalmodel.customerrelationship = ''
    this.showcontact = 0;

  }
  getname(){
    this.userdata.getname()
    .subscribe(
      res =>{
        this.name=res,
        this.referalmodel.createdby=this.name

      },
      err =>console.log(err)
    )
  }





}



