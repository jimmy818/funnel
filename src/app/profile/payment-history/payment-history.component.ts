import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../../auth.guard';
import { Router,Params,ActivatedRoute} from  '@angular/router';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {

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


