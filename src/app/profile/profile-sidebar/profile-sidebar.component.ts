import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthGuard } from '../../auth.guard';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {


  constructor(public activatedRoute:ActivatedRoute, private router:Router, private _auth: AuthGuard) {
   }
public componentName:any;
  ngOnInit() {
	  var snapshot = this.activatedRoute.snapshot;
	this.componentName = snapshot.routeConfig.component.name;
	
	if (this._auth.isAuthenticated) {
	return true;
	}else{
	this.router.navigate(['/login']);
	return false;
	} 
	
  }
}