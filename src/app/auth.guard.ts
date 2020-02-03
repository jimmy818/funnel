import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, RequestOptions, Response} from '@angular/http';
import { Configuration } from './app.configuration';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
@Injectable()
export class AuthGuard implements CanActivate {
public authToken;
public isAuthenticated; // Set this value dynamically

constructor(private router: Router, private _configuration: Configuration, private http:Http,public afAuth: AngularFireAuth) {}
dataUrl = this._configuration.ServerWithApiUrl;
headersforapi = this._configuration.headersfor;

canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	if (this.isAuthenticated) {
	return true;
	}
	this.router.navigate(['/login']);
	return false;
	} 
	
	loginUser(student){
	return this.http.post(this.dataUrl+'signup', student)
	.map(response => response.text());
	}

	Signup(student){
	return this.http.post(this.dataUrl+'signup',student)	
	 .map(response => response.text());
	}
	
	doGoogleLogin(){
	  return new Promise<any>((resolve, reject) => {
		let provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('profile');
		provider.addScope('email');
		this.afAuth.auth
		.signInWithPopup(provider)
		.then(res => {
		  resolve(res);
		})
	  })
	}
	
	doRegister(value){
	   return new Promise<any>((resolve, reject) => {
		 firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
		 .then(res => {
		   resolve(res);
		 }, err => reject(err))
	   })
	}
	
	signinwith(value){
	   return new Promise<any>((resolve, reject) => {
		 firebase.auth().signInWithEmailAndPassword(value.email, value.password)
		 .then(res => {
		   resolve(res);
		 }, err => reject(err))
	   })
	}
	
	addProfile(jsondata){
		return this.http.post(this.dataUrl+'addprofile/',jsondata)
		.map(response => response.text()); 
	}
	getProfile(jsondata){
		return this.http.post(this.dataUrl+'getprofile/',jsondata)
		.map(response => response.text()); 
	}
	
	upProfile(jsondata){
		return this.http.post(this.dataUrl+'updateprofile/',jsondata)
		.map(response => response.text()); 
	}
	
	resetPasswordsendMail(email) {
		return new Promise<any>((resolve, reject) => {
			firebase.auth().sendPasswordResetEmail(email.email)
			.then(res => {
			resolve(res);
			}, err => reject(err))
		})
	}
	setNewPassword(formvalue) {
		return new Promise<any>((resolve, reject) => {
			firebase.auth().confirmPasswordReset(formvalue.code, formvalue.password)
			.then(res => {
			resolve(res);
			}, err => reject(err))
		})
	}
}


