import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { Router,Params,ActivatedRoute,ParamMap } from  '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
    responses:any;       
	loginForm : FormGroup; 
	errormessage:any;
	error:boolean;
	constructor(
		private _auth: AuthGuard,
		private formBuilder:FormBuilder,
		private router: Router,
		private routes: ActivatedRoute,
		private toastr: ToastrService
	) { }
	public signInButtonLoading = 1;
	
	   uid:any;
	    ngOnInit() {		
		this.loginForm = this.formBuilder.group({ 	
			email: [null,Validators.required],
			password: [null,Validators.required],
		});  
		// this.profileadd()
	}
	
	onSubmit(){
	    this._auth.loginUser(this.loginForm.value)
		.subscribe(dataa => {			
			this.responses = JSON.parse(dataa);
			if(this.responses.status == 1){
				this.error = false;
				this.toastr.success('Login Successfull!');
				setTimeout(()=>{
					localStorage.setItem('loginuseremail', this.responses.data[0].docdata.email);
				    this.router.navigate(['manage-wheels']);
				},2000)
			}		 
			else{
				this.error = true;
				this.errormessage=this.responses.message;
				setTimeout(()=>{
					this.error = false;
				},3000)
			}
		});
	}
	
	tryGoogleLogin(){
		this._auth.doGoogleLogin()
		.then(res => {
			if(res.user.emailVerified == true){
				this.toastr.success('Login Successfull!');
				if(res.additionalUserInfo.isNewUser == true){
					 this.profileadd(res.user.uid)
				} else {
					this.getProfile(res.user.uid)
				}
				this._auth.isAuthenticated = true;
				localStorage.setItem('loginuseremail', res.user.email);
				localStorage.setItem('loginuid', res.user.uid);				
			}		 
			else{
				this.error = true;
				this.errormessage='Something went wrong';
				setTimeout(()=>{
					this.error = false;
				},3000)
			}
		})
	}	
	
	signinwithemail(){
		this.signInButtonLoading = 2;
		this._auth.signinwith(this.loginForm.value)
		.then(res => {
			if(res.user){
				 //console.log(res)
				this.error = false;
				this.toastr.success('Login Successfull!');
				if(res.additionalUserInfo.isNewUser == true){
					 this.profileadd(res.user.uid)
				} else {
					this.getProfile(res.user.uid)
				}
				this.signInButtonLoading = 1;
				this._auth.isAuthenticated = true;
				localStorage.setItem('loginuseremail', res.user.email);
				localStorage.setItem('loginuid', res.user.uid);
			}
		}, err => {
			this.signInButtonLoading = 1;
			this.error = true;
			this.errormessage = err.message;
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
			},1000)
		});		
	}
	getProfile(uid){
		const firebaseuserid= {
		 firebaseuserid:uid	
		}
		// console.log(firebaseuserid);
		this._auth.getProfile(firebaseuserid)
	     .subscribe((data)=>{	 
			this.responses = JSON.parse(data);
			
		//alert(this.responses.data.userId);		
			setTimeout(()=>{				
				localStorage.setItem('loginuserUid', this.responses.data.userId);
				this.router.navigate(['manage-wheels']);
			},1000)
		});		
	}
	}