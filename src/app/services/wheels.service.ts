import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, RequestOptions, Response} from '@angular/http';
import { Configuration } from '../app.configuration';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class WheelsService {

	constructor(private router: Router, private _configuration: Configuration, private http:Http) { }
	dataUrl = this._configuration.ServerWithApiUrl;
	headersforapi = this._configuration.headersfor;
	
	getWheeldata(jsondata){
		return this.http.post(this.dataUrl+'getallwheel/',jsondata)
		.map(response => response.text());
	}
	
	addwheel(jsondata){
		// console.log(jsondata)
		 return this.http.post(this.dataUrl+'addwheel/',jsondata)
		.map(response => response.text());               
	}
	updatewheel(jsondata){
	return this.http.post(this.dataUrl+'updatewheel/',jsondata)
		.map(response => response.text()); 
	}
	getwheelbyid(jsondata){
	return this.http.post(this.dataUrl+'getwheel/',jsondata)
		.map(response => response.text()); 
	}
	getspinresult(jsondata){
	return this.http.post(this.dataUrl+'getallspinresult/',jsondata)
		.map(response => response.text()); 
	}
	
}

