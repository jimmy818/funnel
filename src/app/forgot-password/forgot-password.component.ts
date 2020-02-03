import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { Router,Params,ActivatedRoute} from  '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

	constructor( private _auth: AuthGuard,
		private formBuilder:FormBuilder,
		private router: Router,
		private routes: ActivatedRoute,
		private toastr: ToastrService) { }
		
	ResetPasswordForm : FormGroup;
	changePasswordForm : FormGroup;
	submitted:boolean;
	changePasswordsubmitted:boolean;
	error:boolean;
	errorMessage:any;
	showformSwitch:any;
	mode = this.routes.snapshot.queryParams['mode'];
	oobCode = this.routes.snapshot.queryParams['oobCode'];
	ngOnInit() {
		
		if(this.mode && this.oobCode){
			this.showformSwitch = "changePasswordform"
		} else {
			this.showformSwitch = "resetPasswordform"
		}
		
		this.ResetPasswordForm = this.formBuilder.group({
			email: ['']
		});
		
		this.changePasswordForm = this.formBuilder.group({
			password: [''],
			code: [this.oobCode]
		});
	}

	onSubmit(){
		this.submitted = true;
		if (this.ResetPasswordForm.invalid) {
			return;
		}
		else{
			this._auth.resetPasswordsendMail(this.ResetPasswordForm.value)
			  .then(res => {
					this.error = false;
					this.toastr.success('Password reset email was sent!');					
			  }, err => {
				  this.error = true;
				  this.errorMessage = err.message
			  })
		}
	}
	createNewPassword(){
		this.changePasswordsubmitted = true;
		if (this.changePasswordForm.invalid) {
			return;
		}
		else{
			this._auth.setNewPassword(this.changePasswordForm.value)
			  .then(res => {
					this.error = false;
					this.toastr.success('Your password has been successfully changed!');
					setTimeout(()=>{
						this.router.navigate(['/login'])
						},1000)		
			  }, err => {
				  this.error = true;
				  this.errorMessage = err.message
			  })
		}
	}

 
}
