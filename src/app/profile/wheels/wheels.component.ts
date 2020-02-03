import { Component, OnInit } from '@angular/core';
import { WheelsService } from '../../services/wheels.service'; 
import { Router,Params,ActivatedRoute} from  '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthGuard } from '../../auth.guard';

@Component({
  selector: 'app-wheels',
  templateUrl: './wheels.component.html',
  styleUrls: ['./wheels.component.css']
})
export class WheelsComponent implements OnInit {
loginuser = localStorage.getItem('loginuseremail');
responses:any;
wheeldata:any;
msg:any;
result:any;
curDate:any;
wheelid:any;
crdate:any;
/** Login user variables **/
Uid = localStorage.getItem('loginuserUid');

	constructor( 
		private _wheelService: WheelsService,
		private router: Router,
		private routes: ActivatedRoute,
		private datePipe: DatePipe,
		private toastr: ToastrService,		
		private _auth: AuthGuard) { }
		
		public isWheels = false;
		public step = 1;
	
	ngOnInit() {
		//console.log(this.Uid)
		// this.getAllwheels();
		this.getAllwheels(this.Uid)
		
		if (this._auth.isAuthenticated) {
			return true;
		}else{
			this.router.navigate(['/login']);
			return false;
		} 
		
		console.log(this.crdate)
	}
	
	getAllwheels(Uid){
		const userId= {
		 userId:Number(Uid)
		}
		// console.log(userId)
		this._wheelService.getWheeldata(userId)
		.subscribe (data => {
			this.responses = JSON.parse(data);
			//console.log(this.responses)
			this.wheeldata = this.responses.data;
			// this.result=this.wheeldata.data.guid;
			
		 });
	}
	
	/** Button click on-off function start */
	clickOnOff(user,wheelsguid){
		user.status = !user.status
		
		const status = {
			  guid :wheelsguid,
			status :user.status		
			}
		
		this._wheelService.updatewheel(status)
		.subscribe((response) => {
			var statuscheck = JSON.parse(response);
			if(statuscheck.status == 'true'){
				this.msg = 'Success';
				
			} else {
				
				this.msg = 'Something went wrong';
			}
			this.toastr.success(this.msg);
		},
		error => {
			
			console.log(error);
		});	
			
		
	  }
	 
	
	addwheels(wheelsguid){
		this.step = 2;
			this.crdate=this.datePipe.transform(new Date(),"yyyy-dd-MM HH:mm");
			
		const param = {
			userId : Number(this.Uid),
			version: 1.0,
			 created_at: this.crdate 		
			}
		
		console.log(param)
		this._wheelService.addwheel(param)
		   .subscribe (data => {
			this.responses = JSON.parse(data);
			if(this.responses.status=="true"){
				this.updatewheel(this.responses.data.unique_wheel_id)
		      this.router.navigate(['edit-wheels/'+this.responses.data.unique_wheel_id]);
			}
			  else {
				this.step=1;
				
				this.toastr.error('Something went wrong');
			  }				
	 });
	} 
	
	updatewheel(unique_wheel_id)
	{
	// console.log(unique_wheel_id)
	this.curDate=this.datePipe.transform(new Date(),"yyyy-dd-MM HH:mm");
	this.crdate=this.datePipe.transform(new Date(),"yyyy-dd-MM HH:mm");     
   const wheeldata = {		
 
  "guid": Number(unique_wheel_id),
  "updated_at": this.curDate,
  "created_at":this.crdate,
  "userid":  Number(this.Uid),
  "version": "1.0",
  "wheelName": this.curDate,
  "formType": "email",
  "popupType": "wheelspinning",
  "align": "left",
  "widgetPreSpin":
  {
    "titleText": "Special bonus unlocked!",
    "subtitleText": "You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.", 
    "buttonText": "Try your Luck",
    "declineText": "No, I don't want free gift"
   
  },
  "widgetAfterSpin":
  {
    "titleText": "{winText}",
    "subtitleText": "Don't forget to use the discount code at checkout! Your discount code is:", 
    "buttonText": "CONTINUE & USE DISCOUNT",
    "declineText": "Close",
    "buttonRedirect": false,
    "buttonRedirectURL": ""
  },
  "triggers":
  {
    "delayActive": "True",
    "delayTime": "10 seconds",
    "exitIntentActive": "True",
    "displayLimit": "every day"
  },
  "slices":
      [
        {
          "id":1,
          "label": "Free sample",
          "coupon": "WELCOME",
          "winRatio": "5",
          "winText": "Free Sample",
          "prizeType": "product"
        },
        {
          "id":2,
          "label": "So close!",
          "coupon": "",
          "winRatio": "0",
          "winText": "Sorry",
          "prizeType": "lose"
        },
        {
          "id":3,
          "label": "10% Off",
          "coupon": "10OFF",
          "winRatio": "20",
          "winText": "10% Off",
          "prizeType": "discount"
        },
        {
          "id":4,
          "label": "No luck today.",
          "coupon": "",
          "winRatio": "0",
          "winText": "Sorry",
          "prizeType": "lose"
        },
        {
          "id":5,
          "label": "20% Off",
          "coupon": "20OFF",
          "winRatio": "20",
          "winText": "20% Off",
          "prizeType": "discount"
        },
        {
          "id":6,
          "label": "Sorry, try again!",
          "coupon": "",
          "winRatio": "0",
          "winText": "Sorry",
          "prizeType": "lose"
        },
        {
          "id":7,
          "label": "30% Off",
          "coupon": "30OFF",
          "winRatio": "20",
          "winText": "30% Off",
          "prizeType": "discount"
        },
        {
          "id":8,
          "label": "Next time!",
          "coupon": "",
          "winRatio": "0",
          "winText": "Sorry",
          "prizeType": "lose"
        },
        {
          "id":9,
          "label": "40% Off",
          "coupon": "40OFF",
          "winRatio": "20",
          "winText": "40% Off",
          "prizeType": "discount"
        },
        {
          "id":10,
          "label": "Almost!",
          "coupon": "",
          "winRatio": "0",
          "winText": "Sorry",
          "prizeType": "lose"
        },
        {
          "id":11,
          "label": "50% Off",
          "coupon": "50OFF",
          "winRatio": "15",
          "winText": "50% Off",
          "prizeType": "discount"
        },
        {
          "id":12,
          "label": "Not quite.",
          "coupon": "",
          "winRatio": "0",
          "winText": "Sorry",
          "prizeType": "lose"
        }
      ]
    

		 
}		 


this._wheelService.updatewheel(wheeldata)
		.subscribe((response) => {
			var statuscheck = JSON.parse(response);
			
		},
		error => {
			
			console.log(error);
		});

 console.log(wheeldata)
		 
	}		 
		 		 
}