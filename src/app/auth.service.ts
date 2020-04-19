import { Injectable } from "@angular/core";
import axios from "axios";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  public is_admin : boolean
  constructor() {}

  public checkStatus() :any{
    axios
      .get("http://localhost:8080/api/auth/status")
      .then((response) => {
        console.log(response);
        this.is_admin = response.data.is_admin
      })
      .catch((error) => {
        console.log(error);
        window.location.assign('/')
      });
  }
  public get_isAdmin():boolean{
    return this.is_admin;
  }
}
