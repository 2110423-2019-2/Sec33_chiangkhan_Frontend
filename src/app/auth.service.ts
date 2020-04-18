import { Injectable } from "@angular/core";
import axios from "axios";
import { error } from "protractor";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  public checkStatus() {
    axios
      .get("http://localhost:8080/api/auth/status")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        window.location.assign('/')
      });
  }
}
