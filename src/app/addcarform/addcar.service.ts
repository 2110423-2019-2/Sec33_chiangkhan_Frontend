import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddcarService {

  constructor(private httpClient : HttpClient) { }
  public addCar(addcarForm: any) {
    return this.httpClient.post<any>("http://localhost:8080/api/car", addcarForm).subscribe(
      (res) => console.log(res), 
      (err) => console.log(err));
  }
  public fetchCar(){
    this.httpClient.get('localhost:8080/api/car').subscribe(
      (res) => console.log(res),
      (err) => console.log(err));
 }
}
