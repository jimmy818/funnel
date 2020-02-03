import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
/* Components Include */
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { Page404Component } from './page404/page404.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { BillingdetailsComponent } from './profile/billingdetails/billingdetails.component';
import { PaymentHistoryComponent } from './profile/payment-history/payment-history.component';
import { WheelsComponent } from './profile/wheels/wheels.component';
import { AddnewWheelsComponent } from './profile/wheels/addnew-wheels/addnew-wheels.component';
import { SubscriptionsComponent } from './profile/subscriptions/subscriptions.component';

const routes: Routes = [
{path:'', component:LandingComponent},
{path:'login', component:SigninComponent},
{path:'signup', component:SignupComponent},
{path:'resetpassword', component:ForgotPasswordComponent},
{path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
{path:'change-password', component:ChangePasswordComponent, canActivate: [AuthGuard]},
{path:'billing', component:BillingdetailsComponent, canActivate: [AuthGuard]},
{path:'payment-history', component:PaymentHistoryComponent, canActivate: [AuthGuard]},
{path:'manage-wheels', component:WheelsComponent, canActivate: [AuthGuard]},
{path:'edit-wheels/:id', component:AddnewWheelsComponent, canActivate: [AuthGuard]},
{path:'addnew-wheels', component:AddnewWheelsComponent, canActivate: [AuthGuard]},
{path:'subscription', component:SubscriptionsComponent, canActivate: [AuthGuard]},
{ path: '**',  component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
