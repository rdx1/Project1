import { Component, OnInit } from '@angular/core';
import { CustomersuccessService } from '../customersuccess.service';
import { UUID } from 'angular2-uuid';
import { saveAs } from 'file-saver';
import { FileService } from '../file.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-customersuccess',
  templateUrl: './customersuccess.component.html',
  styleUrls: ['./customersuccess.component.css']
})
export class CustomersuccessComponent implements OnInit {
  public showauto: number = 0;
  public showcontact: number = 0
  public shownom: number = 0;
  showdownloads: boolean = false;
  uuid: string = UUID.UUID().substring(0,10)
  showstatus: boolean = false;
  //public afterdownloads = 0;
  attachmentList: any = [];
  successdetails: any = {
    "customername": "",
    "measurementid": this.uuid,
    "status": 0,
    "day": "",
    "month": "",
    "year": "",
    "transactionid": "",
    "downloadpath":[]
  }
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
  uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/api/uploads' });


  constructor(private custsuccess: CustomersuccessService, private fileService: FileService, private toastr: ToastrService, private router: Router, private customer: CustomerService,private authservice:AuthserviceService) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(response))
      this.successdetails.downloadpath.unshift(this.attachmentList[0])
    }
    this.getCustomers()
    this.getContacts()
    this.getNominations()

  }
  postdetails() {
    this.custsuccess.displaydetails(this.successdetails)
      .subscribe(
        res => this.toastr.success('Added Customer Success', 'Success!'),
        err => this.toastr.error('Error Saving', 'Error!')
      )
    this.successdetails.status = 1;
    this.custsuccess.editcustomersuccess(this.successdetails)
      .subscribe()

  }
  deleteDetails() {
    this.custsuccess.deletecustomersuccess(this.successdetails)
      .subscribe(
        res => {
          this.toastr.info('Deleted Successfully!', 'Error!'),
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/successmeasure"]));
        },
        err => this.toastr.error('Error Saving', 'Error!')
      )
  }
  editDetails() {
    this.custsuccess.editcustomersuccess(this.successdetails)
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
  onCancel() {
    this.router.navigate(['/home/successmeasure'])
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
          this.successdetails.customerid = this.customerdetails.customerid
          this.successdetails.customername = this.customerdetails.customername
          this.successdetails.phonenumber = this.customerdetails.phonenumber
          this.successdetails.address = this.customerdetails.address
          this.successdetails.email = this.customerdetails.email
          this.successdetails.industry = this.customerdetails.industry
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
          this.successdetails.contactid = this.contactdetails.contactid
          this.successdetails.contactphonenumber = this.contactdetails.contactphonenumber
          this.successdetails.contactaddress = this.contactdetails.contactaddress
          this.successdetails.jobfunction = this.contactdetails.jobfunction
          this.successdetails.customerrelationship = this.contactdetails.customerrelationship
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
          this.successdetails.transactionid = this.nomineedetails.transactionid
          this.successdetails.day = this.nomineedetails.day
          this.successdetails.month = this.nomineedetails.month
          this.successdetails.year = this.nomineedetails.year
          this.successdetails.createdby = this.nomineedetails.createdby
          this.successdetails.description = this.nomineedetails.description
          this.shownom = 1;
        },
        err => console.log(err)
      )
  }
  removecustomer() {
    this.successdetails.customerid = ''
    this.successdetails.customername = ''
    this.successdetails.phonenumber = ''
    this.successdetails.address = ''
    this.successdetails.email = ''
    this.successdetails.industry = ''
    this.showauto = 0;

  }
  removecontact() {
    this.successdetails.contactid = ''
    this.successdetails.contactname = ''
    this.successdetails.contactphonenumber = ''
    this.successdetails.contactaddress = ''
    this.successdetails.jobfunction = ''
    this.successdetails.customerrelationship = ''
    this.showcontact = 0;

  }
  removenominee() {
    this.successdetails.transactionid = ''
    this.successdetails.day = ''
    this.successdetails.month = ''
    this.successdetails.year = ''
    this.successdetails.createdby = ''
    this.successdetails.description = ''
    this.shownom = 0;
  }

}
