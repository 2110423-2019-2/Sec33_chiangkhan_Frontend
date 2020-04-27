import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { AuthService} from '../auth.service'
import { environment } from '../../environments/environment.prod'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  is_admin:any
  information:any
  url:string
  constructor(private auth:AuthService) { 
  }

  ngOnInit() {
    axios
    .get("http://"+environment.host+":8080/api/auth/status")
    .then((response) => {
      console.log(response);
      this.is_admin = response.data.is_admin
    })
    .catch((error) => {
      console.log(error);
      window.location.assign('/')
    });
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    axios
      .get("http://"+environment.host+":8080/api/member/info")
      .then((response) => {
        console.log(response.data);
        this.information = response.data;
        this.url = this.information.member_profile
        console.log(this.url)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        // this.fetchPhoto();
      });
  }
  signOut(){
    axios.get("http://"+environment.host+":8080/api/auth/logout")
    .then((response) => {
      console.log(response)
      window.location.assign("/")
    }) 
    .catch((error) => console.log(error)) 
  }
 
}
