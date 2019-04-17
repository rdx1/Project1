import { Component, OnInit,TemplateRef } from '@angular/core';
import { SearchdetailsService } from '../searchdetails.service';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { JobfunctionsService } from '../jobfunctions.service';
import { AuthserviceService } from '../authservice.service';


@Component({
  selector: 'app-displaycontactsearch',
  templateUrl: './displaycontactsearch.component.html',
  styleUrls: ['./displaycontactsearch.component.css']
})
export class DisplaycontactsearchComponent implements OnInit {
  searchdetails: any = {}
  newjobfunction = {};
  modalRef: BsModalRef;
  jobfunctions = [];

  constructor(private search: SearchdetailsService, private toastr: ToastrService, private customer: CustomerService, private router: Router,private modalService: BsModalService, private jobfunc: JobfunctionsService,private authservice:AuthserviceService) { }

  ngOnInit() {
    this.currentuser()
    this.getjobfunctions()
  }
  currentuser() {

    this.searchdetails = this.search.contactitems
    console.log(this.searchdetails)

  }
  deletecontact() {
    this.customer.deletecontact(this.searchdetails)
      .subscribe(
        res => {
          this.toastr.success('Deleted Contact', 'Delete Successful!'),
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home/leads/searchcontact"]));
        },
        err => this.toastr.error('Error Saving', 'Error!')
      )
  }
  editcontact() {
    this.customer.editcontact(this.searchdetails)
      .subscribe(
        res => this.toastr.success('Edited Contact', 'Edit Succesful!'),
        err => this.toastr.error('Error Saving', 'Error!')
      )

  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  addmodal2(template: TemplateRef<any>) {
    switch (this.searchdetails.jobfunction) {
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

}
