import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { UUID } from 'angular2-uuid';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import {FileUploadModule} from 'ng2-file-upload'
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ChartsModule } from 'ng2-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ToastrModule} from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OpenPageComponent } from './open-page/open-page.component';
import { SearchComponent } from './search/search.component';
import { NominationComponent } from './nomination/nomination.component';
import { HomenominationComponent } from './homenomination/homenomination.component';
import { AuthserviceService } from './authservice.service';
import { AuthGuard } from './auth.guard';
import { HttpInterceptorService } from './http-interceptor.service';
import { ReferalService } from './referal.service';
import { LoginuserService } from './loginuser.service';
import { NominationlistService } from './nominationlist.service';
import { NominationdetailsComponent } from './nominationdetails/nominationdetails.component';
import { DisplaysearchComponent } from './displaysearch/displaysearch.component';
import { CustomerComponent } from './customer/customer.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { SearchcustomerComponent } from './searchcustomer/searchcustomer.component';
import { SearchcontactComponent } from './searchcontact/searchcontact.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { CustomersuccessComponent } from './customersuccess/customersuccess.component';
import { SuccesssearchComponent } from './successsearch/successsearch.component';
import { DisplaycustomersearchComponent } from './displaycustomersearch/displaycustomersearch.component';
import { DisplaycontactsearchComponent } from './displaycontactsearch/displaycontactsearch.component';
import { DisplaycustomersuccesssearchComponent } from './displaycustomersuccesssearch/displaycustomersuccesssearch.component';
import { ChartComponent } from './chart/chart.component';
import { SuccesschartComponent } from './successchart/successchart.component';
import { ReportsComponent } from './reports/reports.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OpenPageComponent,
    SearchComponent,
    NominationComponent,
    HomenominationComponent,
    NominationdetailsComponent,
    DisplaysearchComponent,
    CustomerComponent,
    AddcustomerComponent,
    AddcontactComponent,
    SearchcustomerComponent,
    SearchcontactComponent,
    MeasurementComponent,
    CustomersuccessComponent,
    SuccesssearchComponent,
    DisplaycustomersearchComponent,
    DisplaycontactsearchComponent,
    DisplaycustomersuccesssearchComponent,
    ChartComponent,
    SuccesschartComponent,
    ReportsComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FileUploadModule,
    TypeaheadModule.forRoot(),
    ChartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:500,
      positionClass:'toast-top-right',
      preventDuplicates:true
    }),
    NgxPaginationModule
    
  ],
  providers: [AuthserviceService,AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorService,
    multi:true
  },ReferalService,LoginuserService,NominationlistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
