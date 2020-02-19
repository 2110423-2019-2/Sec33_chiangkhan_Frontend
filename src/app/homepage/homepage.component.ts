import { Component, OnInit } from '@angular/core';
import { ApiClient } from '../api-client';

interface Friend {
	id: number;
	name: string;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
    public friends: Friend[];
    private apiClient: ApiClient
    constructor( apiClient: ApiClient ) {
 
		this.apiClient = apiClient;
		this.friends = [];
		document.cookie = "XSRF-TOKEN=server-generated-token";
 
  }

  ngOnInit() {
    // this.isLogin()
  }
  
  async isLogin(){
    try {
			this.friends = await this.apiClient.get<Friend[]>({
				url: "http://localhost:3000/profile"
				
			}); 
			console.log(this.friends)
		} catch ( error ) {
			console.error( error );
		}
  }

}
