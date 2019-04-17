import { Component, OnInit, TemplateRef } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerService } from '../customer.service';
import { JobfunctionsService } from '../jobfunctions.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {
  uuid: string = UUID.UUID().substring(0,10)
  showstatus: boolean = false;
  contactdetails = {
    "contactid": this.uuid,
    "jobfunction": "",
    "status": 0,
    "contatcphonenumber":""
  }
  newjobfunction = {};
  modalRef: BsModalRef;
  jobfunctions = [];
  constructor(private customer: CustomerService, private modalService: BsModalService, private jobfunc: JobfunctionsService, private toastr: ToastrService, private router: Router,private authservice:AuthserviceService) { }

  ngOnInit() {
    this.getjobfunctions()
  }
  postdetails() {
    this.customer.addContact(this.contactdetails)
      .subscribe(
        res => this.toastr.success('Contact Added', 'Successful!'),
        err => this.toastr.error('Error Occured', 'Error!')
      )
    this.contactdetails.status = 1
    this.customer.editcontact(this.contactdetails)
      .subscribe()

  }
  deletecontact() {
    this.customer.deletecontact(this.contactdetails)
      .subscribe(
        res =>{ this.toastr.info('Deleted Contact', 'Delete Successful!'),
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/leads"]));
      },
        err => this.toastr.error('Error Saving', 'Error!')

      )
  }
  editcontact() {
    this.toastr.success('Edited Contact', 'Edit Succesful!')
    this.customer.editcontact(this.contactdetails)
      .subscribe(
        res =>this.toastr.info('Saved Customer!','Edit Successful!'),
        err =>this.toastr.error('Error Saving','Error!')
      )

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  addmodal2(template: TemplateRef<any>) {
    switch (this.contactdetails.jobfunction) {
      case "addnew": {
        this.openModal(template)
      }
    }
  }
  getjobfunctions() {
    this.jobfunc.jobfunctions()
      .subscribe(
        res => {
          this.jobfunctions = res,
            console.log(this.jobfunctions)
        },
        err => console.log(err)
      )
  }
  addJobFunction() {
    this.jobfunc.addjobfunc(this.newjobfunction)
      .subscribe(
        res => {
          console.log(res),
            this.getjobfunctions()
          this.newjobfunction = '';
        },
        err => console.log(err)
      )
  }
  onCancel() {
    this.router.navigate(['/home/leads'])
  }
  

}
