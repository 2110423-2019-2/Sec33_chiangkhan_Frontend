import { Component, OnInit } from '@angular/core';
import axios from 'axios'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
