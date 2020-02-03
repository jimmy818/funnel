import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthGuard } from '../../auth.guard';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(public activatedRoute:ActivatedRoute, private router:Router, private _auth: AuthGuard) { }

  ngOnInit() {
	  
	if (this._auth.isAuthenticated) {
	return true;
	}else{
	this.router.navigate(['/login']);
	return false;
	}   
	  
  }

}
