import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../auth.guard';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl, FormGroupName} from '@angular/forms';
import { Router,Params,ActivatedRoute} from  '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
updateprofile : FormGroup;
Uid = localStorage.getItem('loginuserUid');
loginUserName = localStorage.getItem('loginuseremail');
uid=localStorage.getItem('loginuid');
responses:any;
  constructor(private _auth: AuthGuard,
	 private formBuilder:FormBuilder,
	 private router: Router,
     private routes: ActivatedRoute,
	 private toastr: ToastrService) { }

	ngOnInit() {
		
		 this.getProfile(this.uid)
		
		this.updateprofile = this.formBuilder.group({ 
			 firstName: ['', Validators.required],
			 email: [this.loginUserName, Validators.required],
			 lastName: ['', Validators.required],
			 phone: ['', Validators.required],
			 adress: ['', Validators.required],
			 city: ['', Validators.required],
			 postalCode: ['', Validators.required],
			 country: ['', Validators.required],
			 userId: [Number(this.Uid)]
		});	
    
	  if (this._auth.isAuthenticated) {
	return true;
	}else{
	this.router.navigate(['/login']);
	return false;
	} 

		
	}



      getProfile(uid){
		
		const firebaseuserid= {
		 firebaseuserid:this.uid
		}
		this._auth.getProfile(firebaseuserid)
	     .subscribe((data)=>{			
			this.responses = JSON.parse(data);
			//console.log(this.responses.data)
			
			if(this.responses.data.email){
			this.updateprofile.patchValue({
			email:this.responses.data.email,
            firstName:this.responses.data.firstName,
            lastName:this.responses.data.lastName,
            phone:this.responses.data.phone,
			adress:this.responses.data.adress,
			city:this.responses.data.city,
			postalCode:this.responses.data.postalCode,
			country:this.responses.data.country
				});	
			}
		});		
	}	

	profileupdate(){
		
		this.updateprofile.patchValue({
			email:this.loginUserName			
		})
		//console.log(this.updateprofile.value)
		this._auth.upProfile(this.updateprofile.value)
	     .subscribe((data)=>{			
			this.responses = JSON.parse(data);
			if(this.responses.status == "success"){
				this.toastr.success("Profile update successfully");
			}
		});		
	}
		
}