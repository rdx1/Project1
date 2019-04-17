import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OpenPageComponent } from './open-page/open-page.component';
import { SearchComponent } from './search/search.component';
import { NominationComponent } from './nomination/nomination.component';
import { LoginComponent } from './login/login.component';
import { HomenominationComponent } from './homenomination/homenomination.component';
import {AuthGuard} from './auth.guard';
import { NominationdetailsComponent } from './nominationdetails/nominationdetails.component';
import { DisplaysearchComponent } from './displaysearch/displaysearch.component';
import { CustomerComponent } from './customer/customer.component';
import { SearchcustomerComponent } from './searchcustomer/searchcustomer.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { SearchcontactComponent } from './searchcontact/searchcontact.component';
import { MeasurementComponent } from './measurement/measurement.component';
import { CustomersuccessComponent } from './customersuccess/customersuccess.component';
import { SuccesssearchComponent } from './successsearch/successsearch.component';
import { DisplaycustomersearchComponent } from './displaycustomersearch/displaycustomersearch.component';
import { DisplaycontactsearchComponent } from './displaycontactsearch/displaycontactsearch.component';
import { ChartComponent } from './chart/chart.component';
import { SuccesschartComponent } from './successchart/successchart.component';
import { ReportsComponent } from './reports/reports.component';
import { RegisterComponent } from './register/register.component';
import { DisplaycustomersuccesssearchComponent } from './displaycustomersuccesssearch/displaycustomersuccesssearch.component';


const routes: Routes = [
  {
    path:"",
    component:LoginComponent,

  },
  {
    path:"home",
    component:OpenPageComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/register",
    component:RegisterComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/search",
    component:SearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/nomination/newnomination",
    component:NominationComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/nomination",
    component:HomenominationComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/nomination/nominationdetails/:id",
    component:NominationdetailsComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/search/searchdetails/:id",
    component:DisplaysearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/leads",
    component:CustomerComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/leads/newcustomer",
    component:AddcustomerComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/leads/searchcustomer",
    component:SearchcustomerComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/leads/newcontact",
    component:AddcontactComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/leads/searchcontact",
    component:SearchcontactComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/successmeasure",
    component:MeasurementComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/successmeasure/newmeasure",
    component:CustomersuccessComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/successmeasure/search",
    component:SuccesssearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/successmeasure/search/customersuccessdetails/:id",
    component:DisplaycustomersuccesssearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/leads/searchcontact/contactdetails/:id",
    component:DisplaycontactsearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/leads/searchcustomer/customerdetails/:id",
    component:DisplaycustomersearchComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/reports/getcustomerreports",
    component:ChartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/reports/getcustomersuccessreports",
    component:SuccesschartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"home/reports",
    component:ReportsComponent,
    canActivate:[AuthGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
