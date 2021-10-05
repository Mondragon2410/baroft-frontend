import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Barber } from '../models/barber';



@Injectable({
  providedIn: 'root'
})
export class BarberService {

   
  barbers: Barber[] = []; 
  selectedBarber: Barber;
  readonly URL_API = environment.baseUrl + '/barbers';

 

  constructor( private http: HttpClient) { 

    this.selectedBarber = new Barber();
  }

  async getBarbers1() {
    const res = await  this.http.get(this.URL_API)
      .toPromise();
    return res;
  }

 

  
    getBarbers(){
   
      return this.http.get(this.URL_API)
    }

    postBarber(Barber: Barber){
      return this.http.post(this.URL_API, Barber);
    }

    putBarber(barber: Barber){
      return this.http.put(this.URL_API + `/${barber._id}`, barber);
    }

    deleteBarber(_id: string){
      return this.http.delete(this.URL_API + `/${ _id }`);

    }

    getBarber(_id: string){
      return this.http.get(this.URL_API + `/${ _id }`);
    }

    getBarberByUserCode(_id: string){
      return this.http.get(this.URL_API + `/userCode/${ _id }`);
    }

}