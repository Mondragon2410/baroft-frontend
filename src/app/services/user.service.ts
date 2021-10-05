import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {


    
  readonly URL_API = environment.baseUrl + '/users';

  constructor(private http: HttpClient) { }



  getUsers(){
    return this.http.get(this.URL_API);

  }

  getUser(_id: string){
    return this.http.get(this.URL_API + `/${ _id }`);
  }

}
