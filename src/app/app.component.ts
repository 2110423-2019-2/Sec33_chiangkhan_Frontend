import { Component } from '@angular/core';
import { ApiClient } from './api-client';

interface Friend {
	id: number;
	name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public friends: Friend[];
 
	private apiClient: ApiClient;
  title = 'Rentsee';

  constructor( apiClient: ApiClient ) {
 
		this.apiClient = apiClient;
		this.friends = [];
		document.cookie = "XSRF-TOKEN=server-generated-token";
 
  }
  public async loadFriends() : Promise<void> {
 
		try {
			this.friends = await this.apiClient.get<Friend[]>({
				url: "api/friends.json",
				params: {
					limit: 10
				}
			});
		} catch ( error ) {
			console.error( error );
		}
 
	}
}
