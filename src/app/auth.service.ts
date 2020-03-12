import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {IUser} from './user'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REST_API_SERVER = "https://127.0.0.0:3000/auth/login";
  private _url = '../assets/user.json'
  constructor (private httpClient: HttpClient) {
   }
  

  public login(loginForm:any){
    return this.httpClient.post<any>("http://localhost:8080/api/auth/login",loginForm).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }
}

