import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { forgetPassword, resetNewPassword, resetPassword, signInData, signUpData } from '../../../shared/models/data';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../../../enviroment/enviroment';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

private router:Router=inject(Router)
  userData: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private httpClient: HttpClient,@Inject(PLATFORM_ID) ID :object) {
    if(isPlatformBrowser(ID)){
      if(localStorage.getItem('userToken') != null){
      this.decodeingUserData()
    }
    }

  }

  signUp(data: signUpData): Observable<any> {
    return this.httpClient.post(`${baseUrl}/api/v1/auth/signup`, data);
  }

  logIn(data: signInData): Observable<any> {
    return this.httpClient.post(`${baseUrl}/api/v1/auth/signin`, data);
  }

  decodeingUserData() {
    const token = localStorage.getItem('userToken')!;
    const decoded = jwtDecode(token);
    this.userData.next(decoded)
    console.log(this.userData.getValue());
  }

  logOut(){
    localStorage.removeItem('userToken')
    localStorage.removeItem('userEmail')
    this.userData.next(null)
    this.router.navigate(['login'])
  }


  forgerPassword(data:forgetPassword):Observable<any>
  {
    return this.httpClient.post(`${baseUrl}/api/v1/auth/forgotPasswords`, data);
  }


  resetPassword(data:resetPassword):Observable<any>
  {
    return this.httpClient.post(`${baseUrl}/api/v1/auth/verifyResetCode`, data);
  }


  resetNewPassword(data:resetNewPassword):Observable<any>
  {
    return this.httpClient.put(`${baseUrl}/api/v1/auth/resetPassword`, data);
  }


}
