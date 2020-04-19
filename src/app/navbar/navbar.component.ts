import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { AuthService} from '../auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  is_admin:any
  constructor(private auth:AuthService) { 
  }

  ngOnInit() {
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

  signOut(){
    axios.get("http://localhost:8080/api/auth/logout")
    .then((response) => {
      console.log(response)
      window.location.assign("/")
    }) 
    .catch((error) => console.log(error)) 
  }
 
}
