import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import {IUser} from './user'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private REST_API_SERVER = "http://localhost:3000/homepage";
  private _url = '../assets/user.json'
  constructor (private httpClient: HttpClient) {
   }
  
  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER);
  }

  async getRequestAxios() {
    try {
      const response = await axios.get(this.REST_API_SERVER);
      return "Hello"
    } catch (error) {
      return "error"
    }
  }
  public getUser() : Observable<IUser[]>{
    return this.httpClient.get<IUser[]>(this.REST_API_SERVER)
  }
}

