import { Component,ViewChild, OnInit ,AfterViewInit,ElementRef} from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Label } from 'ng2-charts';
import { WheelsService } from '../../../services/wheels.service'; 
import { Router,Params,ActivatedRoute,ParamMap } from  '@angular/router';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { AuthGuard } from '../../../auth.guard';
declare var WheelPanelPreview: any;
declare var $;
@Component({
  selector: 'app-addnew-wheels',
  templateUrl: './addnew-wheels.component.html',
  styleUrls: ['./addnew-wheels.component.css']
})
export class AddnewWheelsComponent implements OnInit {
public barChartOptions: ChartOptions = {
	responsive: true,	
	// We use these empty structures as placeholders for dynamic theming.
	scales: { xAxes: [{}], yAxes: [{}] },
	};
	public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public generalTabSave = 1;
	public generalTabSavenext = 1;
	public designTabSuccessSavenext=1;
	public triggerButtonSavenext=1;
	public designTabWidgetSave = 1;
	public designTabSuccessSave = 1;
	public sliceButtonSave = 1;
	public triggerButtonSave = 1;
	public copyCodeButton = 1;
	public slicesTemplate = ['#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff'];
	public slicesTemplate_1 =['#e7c471','#c0dbe9','#ada4d6','#e8c6d6','#ffffe0','#c8e9a5']; 
	public isUpdateColorPicker = [0,0,0,0,0,0];
	public winStateTabs = 1;
	public phoneViewWinState = 0;
	public phoneViewWinDiscount = 0;
	public phoneViewWinProduct = 0;
	public phoneViewLoose = 0;

	public barChartData: ChartDataSets[] = [
	{ data: [65, 59, 80, 81, 56, 55, 40], label: 'View' },
	{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Signup' }
	];
	                                                                                                  
	// widget variables

	public headingvalue = 'Do you want to win? ';
	public headingvalues = 'Spin to Win';
	public headingvaluesSuccess = '{winText}';
	public labelvalue = 'We dont sell your data';
	public labelvalues = 'Try for free';
	public labelvaluesSuccess = "Don't forget to use the discount code at checkout! Your discount code is:";
	public buttonvalue = 'Yes, I want to win';
	public buttonvalues = 'Yes, I want to win!';
	public buttonvaluesSuccess = 'CONTINUE & USE DISCOUNT';
	public declineText = "No, thanks";
	public closeText = 'Close';
	public placeholderText = 'Please enter your email';
	public tab = 'tab1';
	public totalPercentage = 0;
	public percentages = [];
	public WinText = '{{WinText}}';
	@ViewChild(MatPaginator, { static: true}) paginator: MatPaginator;
	displayedColumns = ['email', 'date', 'result'];
	dataSource: MatTableDataSource<Element>;
	
	constructor(
	    private formBuilder:FormBuilder,
	    private _wheelService: WheelsService,
		private router: Router,
		private _Activatedroute:ActivatedRoute,
		private routes: ActivatedRoute,
		private datePipe: DatePipe,
		private toastr: ToastrService,
		private _auth: AuthGuard) { }
   
	/** Declare variables */
	addTrigger:FormGroup;
	addFor:FormGroup;
	widgetform:FormGroup;
	widgetpreform:FormGroup;
	wheelGuID:any;
	WheelDataByid:any;
	slicesForm:FormGroup;
	sliceItemsArray:FormArray;
	loginuserUid = localStorage.getItem('loginuserUid');
	loginUserName = localStorage.getItem('loginuseremail');
	sliceshere:any;
	intigrationLink:any;
	responses:any;
	allresult:any;
	crdate:any;
	
	/** Define slices array */
	slicesheredata = [
	  {prizeType: "lose", label: 'Free shipping', coupon: 'EXAMPLE', winRatio: '1', winText: '5% Off'},
	  {prizeType: "lose", label: 'So close!', coupon: '-', winRatio: '1', winText: 'Sorry'},
	  {prizeType: "lose", label: '10% Off', coupon: 'EXAMPLE', winRatio: '1', winText: '10% Off'},
	  {prizeType: "lose", label: 'No luck today.', coupon: '-', winRatio: '1', winText: 'Sorry'},
	  {prizeType: "lose", label: '20% Off', coupon: 'EXAMPLE', winRatio: '1', winText: '20% Off'},
	  {prizeType: "lose", label: 'Sorry, try again!', coupon: '-', winRatio: '1', winText: 'Sorry'},
	  {prizeType: "lose", label: '30% Off', coupon: 'EXAMPLE', winRatio: '1', winText: '30% Off'},
	  {prizeType: "lose", label: 'Next time!', coupon: '-', winRatio: '1', winText: 'Sorry'},
	  {prizeType: "lose", label: '40% Off', coupon: 'EXAMPLE', winRatio: '1', winText: '40% Off'},
	  {prizeType: "lose", label: 'Almost!', coupon: '-', winRatio: '1', winText: 'Sorry'},
	  {prizeType: "lose", label: '50% Off!', coupon: 'EXAMPLE', winRatio: '1', winText: '50% Off'},
	  {prizeType: "lose", label: 'Not quite.', coupon: '-', winRatio: '1', winText: 'Sorry'},
	];
	
	ngOnInit() {
		this.crdate=this.datePipe.transform(new Date(),"yyyy-dd-MM HH:mm");   
		this.dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
		this.dataSource.paginator = this.paginator;

		$(".icha0").css({ 'background-color' : '', 'opacity' : '' });
				
		/** Get the url parameter */
		this._Activatedroute.paramMap.subscribe(params => {         
			this.wheelGuID = params.get('id');
		});
		
		this.intigrationLink = '<script>window.FunnelWheel = {};window.FunnelWheel.GUID = '+this.wheelGuID+';</script><script src="https://cdn.funnelspin.com/assets/wheel.js"></script>'
		
		/** Create general tab form */
		this.addFor = this.formBuilder.group({ 
			wheelName:  [''],
			popupType:  ["wheelspinning"],
			formType:  ["email"],
			guid:[''],
			userId:[''],	
            created_at:[this.crdate],
            updated_at:	[this.crdate],
            version:["1.0"],
            align:["left"]			
		});
	  
	      
		/** Create trigger tab form */
	    this.addTrigger = this.formBuilder.group({ 
			delayTime:  ['0 seconds',Validators.required],
			displayLimit:  ['no limit',Validators.required],
			exitIntentActive:  ['true',Validators.required],
			delayActive:['true',Validators.required]
		});
	  
	      /** Create widgetPreSpin form */
		this.widgetpreform = this.formBuilder.group({ 
			titleText: ['',Validators.required],
			subtitleText:['',Validators.required],
			buttonText:  ['',Validators.required],
			declineText:['',Validators.required]
		});
	     
	     
	  /** Create widgetAfterSpin form */
	    this.widgetform = this.formBuilder.group({ 
			titleText: ['',Validators.required],
			subtitleText:['',Validators.required],
			buttonText:  ['',Validators.required],
			declineText:['',Validators.required],
			buttonRedirect:['true',Validators.required],
			buttonRedirectURL:['',Validators.required]
			
		});
	     
		

		this.getresult()
		/** Calling of functions on lad */
		this.getWheelByID()
		// async function init() {
		// 	const wrapper = document.getElementById("wheel1");
		// 	const wheelPanelPreview = new WheelPanelPreview();
		// 	await wheelPanelPreview.init(wrapper);
	
		// 	const backendWheel = {
		// 	  triggers: {
		// 		displayLimit: "",
		// 		delayActive: false,
		// 		exitIntentActive: false,
		// 		delayTime: "10"
		// 	  },
		// 	  userid: 123456789,
		// 	  wheelName: "First Test Wheel",
		// 	  popupType: "wheelspinning",
		// 	  formType: "email",
		// 	  slices:this.winDiscountWheelData.slices,
		// 	//   slices: [
		// 	// 	{
		// 	// 	  prizeType: "",
		// 	// 	  label: "Free shipping",
		// 	// 	  textColor: "#fff",
		// 	// 	  winRatio: "1",
		// 	// 	  id: 1,
		// 	// 	  bgColor: "#f9ec31",
		// 	// 	  winText: "5% Off",
		// 	// 	  coupon: "EXAMPLE"
		// 	// 	},
		// 	// 	{
		// 	// 	  prizeType: "product",
		// 	// 	  textColor: "#fff",
		// 	// 	  label: "So close!",
		// 	// 	  id: 2,
		// 	// 	  winRatio: "1",
		// 	// 	  bgColor: "#8bc53f",
		// 	// 	  winText: "Sorry",
		// 	// 	  coupon: "-"
		// 	// 	},
		// 	// 	{
		// 	// 	  textColor: "#fff",
		// 	// 	  label: "10% Off",
		// 	// 	  id: 3,
		// 	// 	  winRatio: "1",
		// 	// 	  bgColor: "#009345",
		// 	// 	  winText: "10% Off",
		// 	// 	  coupon: "EXAMPLE",
		// 	// 	  prizeType: ""
		// 	// 	},
		// 	// 	{
		// 	// 	  winText: "Sorry",
		// 	// 	  coupon: "-",
		// 	// 	  prizeType: "",
		// 	// 	  textColor: "#fff",
		// 	// 	  label: "No luck today.",
		// 	// 	  id: 4,
		// 	// 	  winRatio: "1",
		// 	// 	  bgColor: "#00a69c"
		// 	// 	},
		// 	// 	{
		// 	// 	  prizeType: "",
		// 	// 	  label: "20% Off",
		// 	// 	  textColor: "#fff",
		// 	// 	  winRatio: "1",
		// 	// 	  id: 5,
		// 	// 	  bgColor: "#25a9e0",
		// 	// 	  winText: "20% Off",
		// 	// 	  coupon: "EXAMPLE"
		// 	// 	},
		// 	// 	{
		// 	// 	  coupon: "-",
		// 	// 	  prizeType: "",
		// 	// 	  label: "Sorry, try again!",
		// 	// 	  textColor: "#fff",
		// 	// 	  winRatio: "1",
		// 	// 	  id: 6,
		// 	// 	  bgColor: "#1b75bb",
		// 	// 	  winText: "Sorry"
		// 	// 	},
		// 	// 	{
		// 	// 	  bgColor: "#2b388f",
		// 	// 	  winText: "30% Off",
		// 	// 	  coupon: "EXAMPLE",
		// 	// 	  prizeType: "",
		// 	// 	  textColor: "#fff",
		// 	// 	  label: "30% Off",
		// 	// 	  id: 7,
		// 	// 	  winRatio: "1"
		// 	// 	},
		// 	// 	{
		// 	// 	  textColor: "#fff",
		// 	// 	  label: "Next time!",
		// 	// 	  id: 8,
		// 	// 	  winRatio: "1",
		// 	// 	  bgColor: "#652d90",
		// 	// 	  winText: "Sorry",
		// 	// 	  coupon: "-",
		// 	// 	  prizeType: ""
		// 	// 	},
		// 	// 	{
		// 	// 	  prizeType: "",
		// 	// 	  textColor: "#fff",
		// 	// 	  label: "40% Off",
		// 	// 	  id: 9,
		// 	// 	  winRatio: "1",
		// 	// 	  bgColor: "#9e1f63",
		// 	// 	  winText: "40% Off",
		// 	// 	  coupon: "EXAMPLE"
		// 	// 	},
		// 	// 	{
		// 	// 	  coupon: "-",
		// 	// 	  prizeType: "",
		// 	// 	  label: "Almost!",
		// 	// 	  textColor: "#fff",
		// 	// 	  winRatio: "1",
		// 	// 	  id: 10,
		// 	// 	  bgColor: "#be1e2d",
		// 	// 	  winText: "Sorry"
		// 	// 	},
		// 	// 	{
		// 	// 	  label: "50% Off!",
		// 	// 	  textColor: "#fff",
		// 	// 	  id: 11,
		// 	// 	  winRatio: "1",
		// 	// 	  bgColor: "#f05a28",
		// 	// 	  winText: "50% Off",
		// 	// 	  coupon: "EXAMPLE",
		// 	// 	  prizeType: ""
		// 	// 	},
		// 	// 	{
		// 	// 	  prizeType: "",
		// 	// 	  textColor: "#fff",
		// 	// 	  label: "Not quite.",
		// 	// 	  id: 12,
		// 	// 	  winRatio: "1",
		// 	// 	  bgColor: "#f6921e",
		// 	// 	  winText: "Sorry",
		// 	// 	  coupon: "-"
		// 	// 	}
		// 	//   ],
		// 	  guid: 123456789,
		// 	  widgetAfterSpin: {
		// 		subtitleText:
		// 		  "Don't forget to use the discount code at checkout! Your discount code is:",
		// 		titleText: "{winText}",
		// 		buttonText: "CONTINUE & USE DISCOUNT",
		// 		declineText: "Close"
		// 	  },
		// 	  widgetPreSpin: {
		// 		subtitleText:
		// 		  "You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.",
		// 		titleText: "Special bonus unlocked!",
		// 		declineText: "No, I don't want free gift",
		// 		buttonText: "Try your Luck",
		// 		nameField: true,
		// 		nameInputPlaceholder: "Input your full name"
		// 	  }
		// 	};
		// 	console.log("sssss",backendWheel);
			
		// 	await wheelPanelPreview.show(backendWheel);
		//   }
		//   init();
	}
	/** Define slice form */
	buildSlicesForm(sliceeeee){
     this.slicesForm = this.formBuilder.group({
			slices:this.formBuilder.array([
				this.formBuilder.group({				 
					id:this.formBuilder.control(1),
					label:this.formBuilder.control(sliceeeee[0].label),
					coupon:this.formBuilder.control(sliceeeee[0].coupon),
					winRatio:this.formBuilder.control(sliceeeee[0].winRatio),
					winText:this.formBuilder.control(sliceeeee[0].winText),
					// bgColor:this.formBuilder.control("#4287f5"),
					// textColor:this.formBuilder.control("#4287f5"),
					prizeType:this.formBuilder.control(sliceeeee[0].prizeType),
				}),
			]),
		});
		this.sliceItemsArray = this.slicesForm.get('slices') as FormArray;
		// console.log(this.sliceItemsArray);
	}
	addMultipleSlices(i,sliceeeee){
		let formGroup:FormGroup = this.formBuilder.group({
			id:this.formBuilder.control(i+1),
			label:this.formBuilder.control(sliceeeee[i].label),
			coupon:this.formBuilder.control(sliceeeee[i].coupon),
			winRatio:this.formBuilder.control(sliceeeee[i].winRatio),
			winText:this.formBuilder.control(sliceeeee[i].winText),
			// bgColor:this.formBuilder.control("#4287f5"),
			// textColor:this.formBuilder.control("#4287f5"),
			prizeType:this.formBuilder.control(sliceeeee[i].prizeType),
		});
		this.sliceItemsArray.push(formGroup);
	}
	
	/** Update general details  */
	update(buttontypes){
		if(buttontypes == 'generaltabsavehere'){			
			this.generalTabSave=2;
		} 
		else if(buttontypes == 'generaltabnext'){
			this.generalTabSavenext=3;
		}
		this.addFor.patchValue({
			guid:Number(this.wheelGuID),
			userId:Number(this.loginuserUid)		
		})
		 //console.log(this.addFor.value)
		this._wheelService.updatewheel(this.addFor.value)
		.subscribe((response) => {
			var statuscheck = JSON.parse(response);
				if(statuscheck.status == 'true'){
				this.msg = 'Success';
				this.generalTabSave=1;
				this.generalTabSavenext=1;
			} else {
				this.generalTabSave=1;
				this.generalTabSavenext=1;
				this.msg = 'Something went wrong';
			}
			this.toastr.success(this.msg);
		},
		error => {
			this.generalTabSave=1;
			this.generalTabSavenext=1;
			//console.log(error);
		});
	}
	
	/** Update trigger details  */	  
	triggerupdate(tbutton){
		
		if(tbutton == 'trigersave'){			
			this.triggerButtonSave=2;
		} 
		else if(tbutton == 'trigersavenext'){
		this.triggerButtonSavenext=3;
		}
		
		const triggervalue = {
			triggers:this.addTrigger.value,
			guid:Number(this.wheelGuID),
			userId:Number(this.loginuserUid)
		}
		this._wheelService.updatewheel(triggervalue)
		.subscribe((response) => {
			var statuscheck = JSON.parse(response);
			if(statuscheck.status == 'true'){
				this.msg = 'Success';
				this.triggerButtonSave=1;
				this.triggerButtonSavenext=1;
			} else {
				this.triggerButtonSave=1;
				this.triggerButtonSavenext=1;
				this.msg = 'Something went wrong';
			}
			this.toastr.success(this.msg);
		},
		error => {
			this.triggerButtonSave=1;
			this.triggerButtonSavenext=1;
			//console.log(error);
		});
	}
	
	/** Update widgetAfterSpin details  */
	widgetupdate(wbutton){
		
		if(wbutton == 'widgettabsavehere'){			
			this.designTabSuccessSave=2;
		} 
		else if(wbutton == 'widgettabnext'){
			this.designTabSuccessSavenext=3;
		}
		
		const widgetvalue = {
		    widgetAfterSpin:this.widgetform.value,
			guid:Number(this.wheelGuID),
			userId:Number(this.loginuserUid)
		}
		this._wheelService.updatewheel(widgetvalue)
		.subscribe((response) => {
			var statuscheck = JSON.parse(response);
			if(statuscheck.status == 'true'){
				this.designTabSuccessSave=1;
				this.designTabSuccessSavenext=1
				this.msg = 'Success';
			} else {
				this.designTabSuccessSave=1;
				this.designTabSuccessSavenext=1
				this.msg = 'Something went wrong';
			}
			this.toastr.success(this.msg);
		},
		error => {
			this.designTabSuccessSave=1;
			this.designTabSuccessSavenext=1;
			//console.log(error);
		});
	 }
	
	/** Update widgetPreSpin details  */
	widgetfirstupdate(){
		this.designTabWidgetSave = 2;
		const widgetprevalue = {
		    widgetPreSpin:this.widgetpreform.value,
			guid:Number(this.wheelGuID),
			userId:Number(this.loginuserUid)
		}
		this._wheelService.updatewheel(widgetprevalue)
		.subscribe((response) => {
			var statuscheck = JSON.parse(response);
			if(statuscheck.status == 'true'){
				
				this.msg = 'Success';
				this.designTabWidgetSave = 1;
			} else {
				this.designTabWidgetSave = 1;
				this.msg = 'Something went wrong';
			}
			this.toastr.success(this.msg);
		},
		error => {
			this.designTabWidgetSave = 1;
			console.log(error);
		});
	}
	
	/** Update Slices details  */
	SlicesUpdate(formvalues){
		this.sliceButtonSave = 2;
		const slicesdata = {
			slices:this.sliceItemsArray.value,
			guid:Number(this.wheelGuID),
			userId:Number(this.loginuserUid)
		}
		this._wheelService.updatewheel(slicesdata)
		.subscribe((response) => {
			var statuscheck = JSON.parse(response);
			if(statuscheck.status == 'true'){
				$("#modal-change-username").modal("hide");
				this.sliceButtonSave = 1;
				this.msg = 'Slices added Successfully';
			} else {
				this.sliceButtonSave = 1;
				this.msg = 'Something went wrong';
			}
			this.toastr.success(this.msg);
		},
		error => {
			this.sliceButtonSave = 1;
			//console.log(error);
		});
	}
	
	
	getresult(){
		const guid= {
			guid:Number(this.wheelGuID)	
		}
		
		this._wheelService.getspinresult(guid)
	     .subscribe((data)=>{			
			this.responses = JSON.parse(data);
			//console.log(this.responses)
			const result=this.responses.data;
			this.allresult=result;
			
		});		
	}	
	

   next(buttontypnext){
	   this.update(buttontypnext)
	   setTimeout(()=>{
		   this.tab = 'tab2'
			$('#general-tab').removeClass('active');
			$('#myTab a[href="#design"]').tab('show');
	   },1000)
		
   }
   
	nexttwo(buttontwo){
		this.widgetupdate(buttontwo)
		setTimeout(()=>{
		this.tab = 'tab3'	
	$('#design-tab').removeClass('active');
	$('#myTab a[href="#triggers"]').tab('show');
	},1000)
	}
	
	nextthree(buttonthree){
	this.triggerupdate(buttonthree)
	setTimeout(()=>{
		this.tab = 'tab4'
	$('#triggers-tab').removeClass('active');
	$('#myTab a[href="#intigration"]').tab('show');
	},1000) 
   }

	/** Select Slices Color Start **/
		selectSliceColor(color,index){
			switch(index) {
				case 0:
				  this.slicesTemplate[0]=color;
					this.isUpdateColorPicker[0]=1;	
				  break;
				case 1:
					this.slicesTemplate[1]=color;
					this.isUpdateColorPicker[1]=1;
				  break;
				case 2:
					this.slicesTemplate[2]=color;
					this.isUpdateColorPicker[2]=1;
				  break;
				case 3:
					this.slicesTemplate[3]=color;
					this.isUpdateColorPicker[3]=1;
				  break;
				case 4:
					this.slicesTemplate[4]=color;
					this.isUpdateColorPicker[4]=1;
				  break;
				case 5:
					this.slicesTemplate[5]=color;
					this.isUpdateColorPicker[5]=1;
				  break;
				default:
				  // code block
			  }
			  let arrs = this.slicesTemplate.map(function (arr) {
				if(typeof arr=='undefined'){
					arr='#ffffff';
				}
				return arr;
			  });
			  this.slicesTemplate = arrs;
		}
	/** Select Slices Color End **/

	/** Select Slices Color Start **/
		slicesOpenColorPicker(color,index){
			switch(index) {
				case 0:
					this.isUpdateColorPicker[0]=0;
				  break;
				case 1:
					this.isUpdateColorPicker[1]=0;
				  break;
				case 2:
					this.isUpdateColorPicker[2]=0;
				  break;
				case 3:
					this.isUpdateColorPicker[3]=0;
				  break;
				case 4:
					this.isUpdateColorPicker[4]=0;
				  break;
				case 5:
					this.isUpdateColorPicker[5]=0;
				  break;
				default:
				  // code block
			  }
			  let arrs = this.slicesTemplate.map(function (arr) {
				if(typeof arr=='undefined'){
					arr='#ffffff';
				}
				return arr;
			  });
			  this.slicesTemplate = arrs;
			  
		}
	/** Select Slices Color End **/

	/** Select Slices Template Start **/
		sliceTemplate(colors){
			this.slicesTemplate = colors;
			this.isUpdateColorPicker = [1,1,1,1,1,1];
		}
		
	/** Select Slices Template End **/
	
	/**	start state wheel data start **/

	getStartStateWheelData(data){
		async function init() {
			const wrapper = document.getElementById("startStateWheel");
			const wheelPanelPreview = new WheelPanelPreview();
			await wheelPanelPreview.init(wrapper);
	
			const backendWheel = {
			  triggers: {
				displayLimit: "",
				delayActive: false,
				exitIntentActive: false,
				delayTime: "10"
			  },
			  userid: 123456789,
			  wheelName: "First Test Wheel",
			  popupType: "wheelspinning",
			  formType: "email",
			  slices: [
				{
				  prizeType: "",
				  label: "Free shipping",
				  textColor: "#fff",
				  winRatio: "1",
				  id: 1,
				  bgColor: "#f9ec31",
				  winText: "5% Off",
				  coupon: "EXAMPLE"
				},
				{
				  prizeType: "product",
				  textColor: "#fff",
				  label: "So close!",
				  id: 2,
				  winRatio: "1",
				  bgColor: "#8bc53f",
				  winText: "Sorry",
				  coupon: "-"
				},
				{
				  textColor: "#fff",
				  label: "10% Off",
				  id: 3,
				  winRatio: "1",
				  bgColor: "#009345",
				  winText: "10% Off",
				  coupon: "EXAMPLE",
				  prizeType: ""
				},
				{
				  winText: "Sorry",
				  coupon: "-",
				  prizeType: "",
				  textColor: "#fff",
				  label: "No luck today.",
				  id: 4,
				  winRatio: "1",
				  bgColor: "#00a69c"
				},
				{
				  prizeType: "",
				  label: "20% Off",
				  textColor: "#fff",
				  winRatio: "1",
				  id: 5,
				  bgColor: "#25a9e0",
				  winText: "20% Off",
				  coupon: "EXAMPLE"
				},
				{
				  coupon: "-",
				  prizeType: "",
				  label: "Sorry, try again!",
				  textColor: "#fff",
				  winRatio: "1",
				  id: 6,
				  bgColor: "#1b75bb",
				  winText: "Sorry"
				},
				{
				  bgColor: "#2b388f",
				  winText: "30% Off",
				  coupon: "EXAMPLE",
				  prizeType: "",
				  textColor: "#fff",
				  label: "30% Off",
				  id: 7,
				  winRatio: "1"
				},
				{
				  textColor: "#fff",
				  label: "Next time!",
				  id: 8,
				  winRatio: "1",
				  bgColor: "#652d90",
				  winText: "Sorry",
				  coupon: "-",
				  prizeType: ""
				},
				{
				  prizeType: "",
				  textColor: "#fff",
				  label: "40% Off",
				  id: 9,
				  winRatio: "1",
				  bgColor: "#9e1f63",
				  winText: "40% Off",
				  coupon: "EXAMPLE"
				},
				{
				  coupon: "-",
				  prizeType: "",
				  label: "Almost!",
				  textColor: "#fff",
				  winRatio: "1",
				  id: 10,
				  bgColor: "#be1e2d",
				  winText: "Sorry"
				},
				{
				  label: "50% Off!",
				  textColor: "#fff",
				  id: 11,
				  winRatio: "1",
				  bgColor: "#f05a28",
				  winText: "50% Off",
				  coupon: "EXAMPLE",
				  prizeType: ""
				},
				{
				  prizeType: "",
				  textColor: "#fff",
				  label: "Not quite.",
				  id: 12,
				  winRatio: "1",
				  bgColor: "#f6921e",
				  winText: "Sorry",
				  coupon: "-"
				}
			  ],
			  guid: 123456789,
			  widgetAfterSpin: {
				subtitleText:
				  "Don't forget to use the discount code at checkout! Your discount code is:",
				titleText: "{winText}",
				buttonText: "CONTINUE & USE DISCOUNT",
				declineText: "Close"
			  },
			  widgetPreSpin: {
				subtitleText:
				  "You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.",
				titleText: "Special bonus unlocked!",
				declineText: "No, I don't want free gift",
				buttonText: "Try your Luck",
				nameField: true,
				nameInputPlaceholder: "Input your full name"
			  }
			};
			console.log("sssss",backendWheel);
			
			await wheelPanelPreview.show(backendWheel);
		  }
		  init();
	}

	/**	start state wheel data end **/

		/**	Wind Discount wheel data start **/

		getWinDiscountWheelData(data){
			async function init() {
				const wrapper = document.getElementById("winDiscountWheel");
				const wheelPanelPreview = new WheelPanelPreview();
				await wheelPanelPreview.init(wrapper);
		
				const backendWheel = {
				  triggers: {
					displayLimit: "",
					delayActive: false,
					exitIntentActive: false,
					delayTime: "10"
				  },
				  userid: 123456789,
				  wheelName: "First Test Wheel",
				  popupType: "wheelspinning",
				  formType: "email",
				  slices: [
					{
					  prizeType: "",
					  label: "Free shipping",
					  textColor: "#fff",
					  winRatio: "1",
					  id: 1,
					  bgColor: "#f9ec31",
					  winText: "5% Off",
					  coupon: "EXAMPLE"
					},
					{
					  prizeType: "product",
					  textColor: "#fff",
					  label: "So close!",
					  id: 2,
					  winRatio: "1",
					  bgColor: "#8bc53f",
					  winText: "Sorry",
					  coupon: "-"
					},
					{
					  textColor: "#fff",
					  label: "10% Off",
					  id: 3,
					  winRatio: "1",
					  bgColor: "#009345",
					  winText: "10% Off",
					  coupon: "EXAMPLE",
					  prizeType: ""
					},
					{
					  winText: "Sorry",
					  coupon: "-",
					  prizeType: "",
					  textColor: "#fff",
					  label: "No luck today.",
					  id: 4,
					  winRatio: "1",
					  bgColor: "#00a69c"
					},
					{
					  prizeType: "",
					  label: "20% Off",
					  textColor: "#fff",
					  winRatio: "1",
					  id: 5,
					  bgColor: "#25a9e0",
					  winText: "20% Off",
					  coupon: "EXAMPLE"
					},
					{
					  coupon: "-",
					  prizeType: "",
					  label: "Sorry, try again!",
					  textColor: "#fff",
					  winRatio: "1",
					  id: 6,
					  bgColor: "#1b75bb",
					  winText: "Sorry"
					},
					{
					  bgColor: "#2b388f",
					  winText: "30% Off",
					  coupon: "EXAMPLE",
					  prizeType: "",
					  textColor: "#fff",
					  label: "30% Off",
					  id: 7,
					  winRatio: "1"
					},
					{
					  textColor: "#fff",
					  label: "Next time!",
					  id: 8,
					  winRatio: "1",
					  bgColor: "#652d90",
					  winText: "Sorry",
					  coupon: "-",
					  prizeType: ""
					},
					{
					  prizeType: "",
					  textColor: "#fff",
					  label: "40% Off",
					  id: 9,
					  winRatio: "1",
					  bgColor: "#9e1f63",
					  winText: "40% Off",
					  coupon: "EXAMPLE"
					},
					{
					  coupon: "-",
					  prizeType: "",
					  label: "Almost!",
					  textColor: "#fff",
					  winRatio: "1",
					  id: 10,
					  bgColor: "#be1e2d",
					  winText: "Sorry"
					},
					{
					  label: "50% Off!",
					  textColor: "#fff",
					  id: 11,
					  winRatio: "1",
					  bgColor: "#f05a28",
					  winText: "50% Off",
					  coupon: "EXAMPLE",
					  prizeType: ""
					},
					{
					  prizeType: "",
					  textColor: "#fff",
					  label: "Not quite.",
					  id: 12,
					  winRatio: "1",
					  bgColor: "#f6921e",
					  winText: "Sorry",
					  coupon: "-"
					}
				  ],
				  guid: 123456789,
				  widgetAfterSpin: {
					subtitleText:
					  "Don't forget to use the discount code at checkout! Your discount code is:",
					titleText: "{winText}",
					buttonText: "CONTINUE & USE DISCOUNT",
					declineText: "Close"
				  },
				  widgetPreSpin: {
					subtitleText:
					  "You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.",
					titleText: "Special bonus unlocked!",
					declineText: "No, I don't want free gift",
					buttonText: "Try your Luck",
					nameField: true,
					nameInputPlaceholder: "Input your full name"
				  }
				};
				console.log("sssss",backendWheel);
				
				await wheelPanelPreview.show(backendWheel);
			  }
			  init();
		}
	
		/**	Win Discount wheel data end **/

		/**	Win Product wheel data start **/

		getWinProductWheelData(data){
			async function init() {
				const wrapper = document.getElementById("winProductWheel");
				const wheelPanelPreview = new WheelPanelPreview();
				await wheelPanelPreview.init(wrapper);
		
				const backendWheel = {
					triggers: {
					displayLimit: "",
					delayActive: false,
					exitIntentActive: false,
					delayTime: "10"
					},
					userid: 123456789,
					wheelName: "First Test Wheel",
					popupType: "wheelspinning",
					formType: "email",
					slices: [
					{
						prizeType: "",
						label: "Free shipping",
						textColor: "#fff",
						winRatio: "1",
						id: 1,
						bgColor: "#f9ec31",
						winText: "5% Off",
						coupon: "EXAMPLE"
					},
					{
						prizeType: "product",
						textColor: "#fff",
						label: "So close!",
						id: 2,
						winRatio: "1",
						bgColor: "#8bc53f",
						winText: "Sorry",
						coupon: "-"
					},
					{
						textColor: "#fff",
						label: "10% Off",
						id: 3,
						winRatio: "1",
						bgColor: "#009345",
						winText: "10% Off",
						coupon: "EXAMPLE",
						prizeType: ""
					},
					{
						winText: "Sorry",
						coupon: "-",
						prizeType: "",
						textColor: "#fff",
						label: "No luck today.",
						id: 4,
						winRatio: "1",
						bgColor: "#00a69c"
					},
					{
						prizeType: "",
						label: "20% Off",
						textColor: "#fff",
						winRatio: "1",
						id: 5,
						bgColor: "#25a9e0",
						winText: "20% Off",
						coupon: "EXAMPLE"
					},
					{
						coupon: "-",
						prizeType: "",
						label: "Sorry, try again!",
						textColor: "#fff",
						winRatio: "1",
						id: 6,
						bgColor: "#1b75bb",
						winText: "Sorry"
					},
					{
						bgColor: "#2b388f",
						winText: "30% Off",
						coupon: "EXAMPLE",
						prizeType: "",
						textColor: "#fff",
						label: "30% Off",
						id: 7,
						winRatio: "1"
					},
					{
						textColor: "#fff",
						label: "Next time!",
						id: 8,
						winRatio: "1",
						bgColor: "#652d90",
						winText: "Sorry",
						coupon: "-",
						prizeType: ""
					},
					{
						prizeType: "",
						textColor: "#fff",
						label: "40% Off",
						id: 9,
						winRatio: "1",
						bgColor: "#9e1f63",
						winText: "40% Off",
						coupon: "EXAMPLE"
					},
					{
						coupon: "-",
						prizeType: "",
						label: "Almost!",
						textColor: "#fff",
						winRatio: "1",
						id: 10,
						bgColor: "#be1e2d",
						winText: "Sorry"
					},
					{
						label: "50% Off!",
						textColor: "#fff",
						id: 11,
						winRatio: "1",
						bgColor: "#f05a28",
						winText: "50% Off",
						coupon: "EXAMPLE",
						prizeType: ""
					},
					{
						prizeType: "",
						textColor: "#fff",
						label: "Not quite.",
						id: 12,
						winRatio: "1",
						bgColor: "#f6921e",
						winText: "Sorry",
						coupon: "-"
					}
					],
					guid: 123456789,
					widgetAfterSpin: {
					subtitleText:
						"Don't forget to use the discount code at checkout! Your discount code is:",
					titleText: "{winText}",
					buttonText: "CONTINUE & USE DISCOUNT",
					declineText: "Close"
					},
					widgetPreSpin: {
					subtitleText:
						"You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.",
					titleText: "Special bonus unlocked!",
					declineText: "No, I don't want free gift",
					buttonText: "Try your Luck",
					nameField: true,
					nameInputPlaceholder: "Input your full name"
					}
				};
				console.log("sssss",backendWheel);
				
				await wheelPanelPreview.show(backendWheel);
				}
				init();
		}
	
		/**	Win Product wheel data end **/


		/**	Loose wheel data start **/

		getLooseWheelData(data){
			async function init() {
				const wrapper = document.getElementById("looseWheel");
				const wheelPanelPreview = new WheelPanelPreview();
				await wheelPanelPreview.init(wrapper);
		
				const backendWheel = {
				  triggers: {
					displayLimit: "",
					delayActive: false,
					exitIntentActive: false,
					delayTime: "10"
				  },
				  userid: 123456789,
				  wheelName: "First Test Wheel",
				  popupType: "wheelspinning",
				  formType: "email",
				  slices: [
					{
					  prizeType: "",
					  label: "Free shipping",
					  textColor: "#fff",
					  winRatio: "1",
					  id: 1,
					  bgColor: "#f9ec31",
					  winText: "5% Off",
					  coupon: "EXAMPLE"
					},
					{
					  prizeType: "product",
					  textColor: "#fff",
					  label: "So close!",
					  id: 2,
					  winRatio: "1",
					  bgColor: "#8bc53f",
					  winText: "Sorry",
					  coupon: "-"
					},
					{
					  textColor: "#fff",
					  label: "10% Off",
					  id: 3,
					  winRatio: "1",
					  bgColor: "#009345",
					  winText: "10% Off",
					  coupon: "EXAMPLE",
					  prizeType: ""
					},
					{
					  winText: "Sorry",
					  coupon: "-",
					  prizeType: "",
					  textColor: "#fff",
					  label: "No luck today.",
					  id: 4,
					  winRatio: "1",
					  bgColor: "#00a69c"
					},
					{
					  prizeType: "",
					  label: "20% Off",
					  textColor: "#fff",
					  winRatio: "1",
					  id: 5,
					  bgColor: "#25a9e0",
					  winText: "20% Off",
					  coupon: "EXAMPLE"
					},
					{
					  coupon: "-",
					  prizeType: "",
					  label: "Sorry, try again!",
					  textColor: "#fff",
					  winRatio: "1",
					  id: 6,
					  bgColor: "#1b75bb",
					  winText: "Sorry"
					},
					{
					  bgColor: "#2b388f",
					  winText: "30% Off",
					  coupon: "EXAMPLE",
					  prizeType: "",
					  textColor: "#fff",
					  label: "30% Off",
					  id: 7,
					  winRatio: "1"
					},
					{
					  textColor: "#fff",
					  label: "Next time!",
					  id: 8,
					  winRatio: "1",
					  bgColor: "#652d90",
					  winText: "Sorry",
					  coupon: "-",
					  prizeType: ""
					},
					{
					  prizeType: "",
					  textColor: "#fff",
					  label: "40% Off",
					  id: 9,
					  winRatio: "1",
					  bgColor: "#9e1f63",
					  winText: "40% Off",
					  coupon: "EXAMPLE"
					},
					{
					  coupon: "-",
					  prizeType: "",
					  label: "Almost!",
					  textColor: "#fff",
					  winRatio: "1",
					  id: 10,
					  bgColor: "#be1e2d",
					  winText: "Sorry"
					},
					{
					  label: "50% Off!",
					  textColor: "#fff",
					  id: 11,
					  winRatio: "1",
					  bgColor: "#f05a28",
					  winText: "50% Off",
					  coupon: "EXAMPLE",
					  prizeType: ""
					},
					{
					  prizeType: "",
					  textColor: "#fff",
					  label: "Not quite.",
					  id: 12,
					  winRatio: "1",
					  bgColor: "#f6921e",
					  winText: "Sorry",
					  coupon: "-"
					}
				  ],
				  guid: 123456789,
				  widgetAfterSpin: {
					subtitleText:
					  "Don't forget to use the discount code at checkout! Your discount code is:",
					titleText: "{winText}",
					buttonText: "CONTINUE & USE DISCOUNT",
					declineText: "Close"
				  },
				  widgetPreSpin: {
					subtitleText:
					  "You have a chance to win a nice big fat discount. Are you feeling lucky? Give it a spin.",
					titleText: "Special bonus unlocked!",
					declineText: "No, I don't want free gift",
					buttonText: "Try your Luck",
					nameField: true,
					nameInputPlaceholder: "Input your full name"
				  }
				};
				console.log("sssss",backendWheel);
				
				await wheelPanelPreview.show(backendWheel);
			  }
			  init();
		}
	
		/**	Loose wheel data end **/



	/** Get wheel data by GuID */
	
	
	getWheelByID(){
		const GuID= {
			guid:Number(this.wheelGuID)	
		}
		this._wheelService.getwheelbyid(GuID)
	     .subscribe((data)=>{	
			this.WheelDataByid = JSON.parse(data)

			/** Call Wheels Data Functions Start**/
			this.getStartStateWheelData(this.WheelDataByid)
			this.getWinDiscountWheelData(this.WheelDataByid)
			this.getWinProductWheelData(this.WheelDataByid)
			this.getLooseWheelData(this.WheelDataByid)
			/** Call Wheels Data Functions End **/

			if(this.WheelDataByid.data.slices){				
				this.sliceshere = this.WheelDataByid.data.slices;
			} else {
				this.sliceshere = this.slicesheredata;
			}
			this.buildSlicesForm(this.sliceshere);
				for(var i=1; i<=11; i++){
				this.addMultipleSlices(i, this.sliceshere);
			}
			if(this.WheelDataByid.data.wheelName && this.WheelDataByid.data.popupType && this.WheelDataByid.data.formType){
				this.addFor.patchValue({
					wheelName:this.WheelDataByid.data.wheelName,
					popupType:this.WheelDataByid.data.popupType,
					formType:this.WheelDataByid.data.formType
				});
			}			
			
			if(this.WheelDataByid.data.widgetPreSpin){
				this.widgetpreform.patchValue({
					titleText:this.WheelDataByid.data.widgetPreSpin.titleText,
					subtitleText:this.WheelDataByid.data.widgetPreSpin.subtitleText,
					buttonText:this.WheelDataByid.data.widgetPreSpin.buttonText,
					declineText:this.WheelDataByid.data.widgetPreSpin.declineText
				});	
			}			
			
			if(this.WheelDataByid.data.widgetAfterSpin){
				this.widgetform.patchValue({
					titleText:this.WheelDataByid.data.widgetAfterSpin.titleText,
					subtitleText:this.WheelDataByid.data.widgetAfterSpin.subtitleText,
					buttonText:this.WheelDataByid.data.widgetAfterSpin.buttonText,
					declineText:this.WheelDataByid.data.widgetAfterSpin.declineText,
					buttonRedirectURL:this.WheelDataByid.data.widgetAfterSpin.buttonRedirectURL,
					buttonRedirect:this.WheelDataByid.data.widgetAfterSpin.buttonRedirect
				 })
			}
			
			if(this.WheelDataByid.data.triggers){
				this.addTrigger.patchValue({
					exitIntentActive:this.WheelDataByid.data.triggers.exitIntentActive,
					delayTime:this.WheelDataByid.data.triggers.delayTime,
					displayLimit:this.WheelDataByid.data.triggers.displayLimit,
					delayActive:this.WheelDataByid.data.triggers.delayActive
				})
			}
		});		
	}
	
	// events
	public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
	console.log(event, active);
	}

	public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
	console.log(event, active);
	}

	public randomize(): void {
	this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
	}

	copyInputMessage(inputElement){
		this.copyCodeButton = 2;
		inputElement.select();
		document.execCommand('copy');
		inputElement.setSelectionRange(0, 0);
		alert('Code copied');
		
		
		this.copyCodeButton = 1;
	}
	msg: string = null;	

	percentageChanged ()
	{
		this.totalPercentage = 0;
		for(let i = 0; i < this.sliceshere.length; i++)
		{
			this.totalPercentage += parseInt(this.sliceshere[i].winRatio);
		}
	}
}
export interface Element {
	email: string,
	date: string,
	result: string
	
  }
  
  const ELEMENT_DATA: Element[] = [
	  {email: 'tedvh@fsd.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'fjsdf@bjmb.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'ewrewvh@fsd.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'mnbvc@opa.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'daslkj@qsda.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'tlona@fsd.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'mnfdfd@bjmb.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'yuiwerer@fsd.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'azanb@opa.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'mklloi@qsda.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'azcvbh@fsd.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'fjsdf@bjmb.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'ewrewvh@fsd.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'mnbvc@opa.com', date: '08-11-2019', result: 'Pass'},
	  {email: 'daslkj@qsda.com', date: '08-11-2019', result: 'Pass'},
  ];