import { Component, OnInit } from '@angular/core';
import { Router,Params,ActivatedRoute,ParamMap } from  '@angular/router';
import { AuthGuard } from '../../auth.guard';
@Component({
  selector: 'app-profile-topbar',
  templateUrl: './profile-topbar.component.html',
  styleUrls: ['./profile-topbar.component.css']
})
export class ProfileTopbarComponent implements OnInit {
loginuser = localStorage.getItem('loginuseremail');

	constructor(
		private router: Router,
		private _auth: AuthGuard,
		private routes: ActivatedRoute,) { }

	ngOnInit() {
	}

	logOuthere(){
		this._auth.isAuthenticated=false;
		localStorage.clear();
		this.router.navigate(['/login']);
	}
	
}
