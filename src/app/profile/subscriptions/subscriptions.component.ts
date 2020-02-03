import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { Router,Params,ActivatedRoute} from  '@angular/router';
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit {

  constructor(
  private router: Router,
  private routes: ActivatedRoute,
  private _auth: AuthGuard
  ) { }

  ngOnInit() {
	   if (this._auth.isAuthenticated) {
	return true;
	}else{
	this.router.navigate(['/login']);
	return false;
	} 
  }

}
