import { Component, OnInit } from '@angular/core';
import { SearchdetailsService } from '../searchdetails.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { CustomersuccessService } from '../customersuccess.service';
import { Router } from '@angular/router';
import { FileService } from '../file.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { saveAs } from 'file-saver';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-displaycustomersuccesssearch',
  templateUrl: './displaycustomersuccesssearch.component.html',
  styleUrls: ['./displaycustomersuccesssearch.component.css']
})
export class DisplaycustomersuccesssearchComponent implements OnInit {
  showdownloads: boolean = false;
  searchdetails: any = {}
  customers: any[] = [];
  contacts: any[] = [];
  nominees: any[] = [];
  speccustomer = {
    "customername": "",
    "contactname": "",
    "transactionid": ""
  }
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
  nomineedetails = {
    "transactionid": "",
    "createdby": "",
    "day": "",
    "month": "",
    "year": "",
    "description": ""
  }
  attachmentList: any = [];
  public showauto: number = 1;
  public showcontact: number = 1
  public shownom: number = 1;

  uploader: FileUploader = new FileUploader({ url: 'api/uploads' });


  constructor(private search: SearchdetailsService, private toastr: ToastrService, private custsuccess: CustomersuccessService, private router: Router, private fileService: FileService, private customer: CustomerService,public authservice:AuthserviceService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response))
      this.searchdetails.downloadpath.unshift(this.attachmentList[0])
    }
    this.getCustomers()
    this.getContacts()
    this.getNominations()
    this.currentuser()
  }
  currentuser() {
    this.searchdetails = this.search.custsuccess
    this.attachmentList=this.searchdetails.downloadpath.slice()
  }
  deleteDetails() {
    this.custsuccess.deletecustomersuccess(this.searchdetails)
      .subscribe(
        res => {
          this.toastr.info('Deleted Successfully!', 'Error!'),
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/successmeasure/search"]));
        },
        err => this.toastr.error('Error Saving', 'Error!')
      )
  }
  editDetails() {
    this.custsuccess.editcustomersuccess(this.searchdetails)
      .subscribe(
        res => this.toastr.info('Saved Succesfully', 'Info'),
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
          this.searchdetails.customerid = this.customerdetails.customerid
          this.searchdetails.customername = this.customerdetails.customername
          this.searchdetails.phonenumber = this.customerdetails.phonenumber
          this.searchdetails.address = this.customerdetails.address
          this.searchdetails.email = this.customerdetails.email
          this.searchdetails.industry = this.customerdetails.industry
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
    console.log(event.item)
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
          this.showcontact = 1;
        },
        err => console.log(err)
      )
  }
  getNominations() {
    this.customer.getspecificnomination()
      .subscribe(
        res => {
          this.nominees = res,
            console.log(this.nominees)
        },
        err => console.log(err)
      )
  }
  addnomineedetails(event: TypeaheadMatch): void {
    console.log(event.item)
    this.speccustomer = event.item
    this.customer.getspecificnominee(this.speccustomer)
      .subscribe(
        res => {
          console.log(res)
          this.nomineedetails = res
          this.searchdetails.transactionid = this.nomineedetails.transactionid
          this.searchdetails.day = this.nomineedetails.day
          this.searchdetails.month = this.nomineedetails.month
          this.searchdetails.year = this.nomineedetails.year
          this.searchdetails.createdby = this.nomineedetails.createdby
          this.searchdetails.description = this.nomineedetails.description
          this.shownom = 1;
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
  removenominee() {
    this.searchdetails.transactionid = ''
    this.searchdetails.day = ''
    this.searchdetails.month = ''
    this.searchdetails.year = ''
    this.searchdetails.createdby = ''
    this.searchdetails.description = ''
    this.shownom = 0;
}
delete(i){
  this.attachmentList.splice(i,1)
  this.searchdetails.downloadpath.splice(i,1)
}
}
