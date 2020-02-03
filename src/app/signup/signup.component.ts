import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { Router,Params,ActivatedRoute} from  '@angular/router';
import { MustMatch } from './must-match.validator';
import { ToastrService } from 'ngx-toastr';
                            
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    error:boolean;
	SignupForm : FormGroup;
    responses:any;
	submitted = false;
	errorMessage:any;
	uid:any;
	constructor(
	 private _auth: AuthGuard,
	 private formBuilder:FormBuilder,
	 private router: Router,
     private routes: ActivatedRoute,
	 private toastr: ToastrService) { }
	 public signupButtonLoader = 1;
   

	ngOnInit() {
		this.SignupForm = this.formBuilder.group({ 
			email: ['',Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
			cpassword: ['', Validators.required]
			}, {
				validator: MustMatch('password', 'cpassword')
		});
	}
	
	get f() { return this.SignupForm.controls; }
 
    onSubmit(){
		this.signupButtonLoader = 2;
		this.submitted = true;
		if (this.SignupForm.invalid) {
			this.signupButtonLoader = 1;
			return;
		}
		else{
			this._auth.doRegister(this.SignupForm.value)
			  .then(res => {
				if(res.user){
				this.error = false;
				this.toastr.success('Register Successfull!');
					this.signupButtonLoader = 1;
					this.profileadd(res.user.uid)
					this._auth.isAuthenticated = true;
					localStorage.setItem('loginuseremail', res.user.email);
					localStorage.setItem('loginuid', res.user.uid);
			}
			  }, err => {
				this.signupButtonLoader = 1;
				  this.error = true;
				  this.errorMessage = err.message
			  })
		}
	}
	tryGoogleLogin(){
		this._auth.doGoogleLogin()
		.then(res => {
			//console.log(res.user);
			if(res.user.emailVerified == true){
				// this.error = false;
				this.toastr.success('Register Successfull!');
				if(res.additionalUserInfo.isNewUser == true){
					 this.profileadd(res.user.uid)
				} else {
					this.getProfile(res.user.uid)
				}
					this._auth.isAuthenticated = true;
					localStorage.setItem('loginuseremail', res.user.email);
					localStorage.setItem('loginuid', res.user.uid)
			}		 
			else{
				this.error = true;
				this.errorMessage='Something went wrong';
				setTimeout(()=>{
					this.error = false;
				},3000)
			}
		})
	}
	profileadd(uid){
		const firebaseuserid= {
		 firebaseuserid:uid	
		}
		this._auth.addProfile(firebaseuserid)
	     .subscribe((data)=>{			
			this.responses = JSON.parse(data);
			setTimeout(()=>{
				localStorage.setItem('loginuserUid', this.responses.data.userId);
				this.router.navigate(['manage-wheels']);
			},2000)
		});		
	}	
	
	getProfile(uid){
		// console.log("second time");
		const firebaseuserid= {
		 firebaseuserid:uid	
		}
		//console.log(firebaseuserid);
		this._auth.getProfile(firebaseuserid)
	     .subscribe((data)=>{			
			this.responses = JSON.parse(data);
			//this.uid=Number(this.responses.data.userId)
				setTimeout(()=>{
				localStorage.setItem('loginuserUid', this.responses.data.userId);
					this.router.navigate(['manage-wheels']);
				},2000)
		});		
	}
	
}