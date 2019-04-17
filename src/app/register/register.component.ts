import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: any = {}
  constructor(private authservice: AuthserviceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
  }
  registerUser() {
    this.authservice.register(this.registerUserData)
      .subscribe(
        res => {
          this.toastr.success('Added User', 'Success!'),
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
              this.router.navigate(["home"]));
        },
        err => this.toastr.error('Error Adding User', 'Error!')

      )

  }

}
