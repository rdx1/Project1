import { Component, OnInit, TemplateRef } from '@angular/core';
import { NomineedetailsService } from '../nomineedetails.service';
import { DboperationsService } from '../dboperations.service';
import { Router } from '@angular/router';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { FileService } from '../file.service';
import { saveAs } from 'file-saver';
import { CustomerService } from '../customer.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { TierserviceService } from '../tierservice.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-nominationdetails',
  templateUrl: './nominationdetails.component.html',
  styleUrls: ['./nominationdetails.component.css']
})
export class NominationdetailsComponent implements OnInit {
  attachmentList: any = [];
  nomineedetails: any = {}
  showstatus: boolean = false;
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
  public nomineedel = {
    "transactionid": ""
  }
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
  //file upload
  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploads' });

  constructor(private nomination: NomineedetailsService, private dboperations: DboperationsService, private router: Router, private fileService: FileService, private customer: CustomerService,private tierservice:TierserviceService,private modalService: BsModalService,private toastr:ToastrService,public authservice:AuthserviceService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response))
      this.nomineedetails.nomineezip.unshift(this.attachmentList[0])
    }
    this.currentuser()
    this.getContacts()
    this.getCustomers()
    this.gettier1()
    this.gettier2()
    this.gettier3()
    
  }

  currentuser() {

    this.nomineedetails = this.nomination.singlenomineedetails
    this.attachmentList = this.nomineedetails.nomineezip.slice()
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
    this.nomineedel = { transactionid: this.nomineedetails.transactionid }
    this.dboperations.deleteDetails(this.nomineedel)
      .subscribe(
        res => {
          res => this.toastr.info('Deleted Nomination!', 'Delete Successful!')
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/nomination"]));
        },
        err => this.toastr.error('Error Saving', 'Error!')
      )
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
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  addmodal(template: TemplateRef<any>) {
    switch (this.nomineedetails.tier1) {
      case "addnew": {
        this.openModal(template)
      }
    }
  }
  addmodal2(template: TemplateRef<any>) {
    switch (this.nomineedetails.tier2) {
      case "addnew": {
        this.openModal(template)
      }
    }
  }
  addmodal3(template: TemplateRef<any>) {
    switch (this.nomineedetails.tier3) {
      case "addnew": {
        this.openModal(template)
      }
    }
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
          this.nomineedetails.customerid = this.customerdetails.customerid
          this.nomineedetails.customername = this.customerdetails.customername
          this.nomineedetails.phonenumber = this.customerdetails.phonenumber
          this.nomineedetails.address = this.customerdetails.address
          this.nomineedetails.email = this.customerdetails.email
          this.nomineedetails.industry = this.customerdetails.industry
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
          this.nomineedetails.contactid = this.contactdetails.contactid
          this.nomineedetails.contactname = this.contactdetails.contactname
          this.nomineedetails.contactphonenumber = this.contactdetails.contactphonenumber
          this.nomineedetails.contactaddress = this.contactdetails.contactaddress
          this.nomineedetails.jobfunction = this.contactdetails.jobfunction
          this.nomineedetails.customerrelationship = this.contactdetails.customerrelationship
          this.showcontact = 1;
        },
        err => console.log(err)
      )
  }
  removecustomer() {
    this.nomineedetails.customerid = ''
    this.nomineedetails.customername = ''
    this.nomineedetails.phonenumber = ''
    this.nomineedetails.address = ''
    this.nomineedetails.email = ''
    this.nomineedetails.industry = ''
    this.showauto = 0;

  }
  removecontact() {
    this.nomineedetails.contactid = ''
    this.nomineedetails.contactname = ''
    this.nomineedetails.contactphonenumber = ''
    this.nomineedetails.contactaddress = ''
    this.nomineedetails.jobfunction = ''
    this.nomineedetails.customerrelationship = ''
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
    this.nomineedetails.nomineezip.splice(i,1)
  }
  onUpdate() {
    this.dboperations.updateDetails(this.nomineedetails)
      .subscribe(
        res => this.toastr.info('Saved Nomination!', 'Edit Successful!'),
        err => this.toastr.error('Error Saving', 'Error!')
      )
  }
  changeStatus() {
    this.nomineedetails.status = 1;
    this.dboperations.updateDetails(this.nomineedetails)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      )
  }

}
