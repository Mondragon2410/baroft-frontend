import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service';



@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  services: Service[] = [];
  selectedService: Service;
  readonly URL_API = environment.baseUrl + '/services';



  constructor(private http: HttpClient) { 

    this.selectedService = new Service();
  }

    getServices(){
    
      return this.http.get(this.URL_API)
    }

    postService(Service: Service){
      console.log(this.http.post(this.URL_API, Service));
      return this.http.post(this.URL_API, Service);
    }

    putService(service: Service){
      return this.http.put(this.URL_API + `/${service._id}`, service);
    }

    deleteService(_id: string){
      return this.http.delete(this.URL_API + `/${ _id }`);

    }
}
