import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  
  readonly URL_API = environment.baseUrl + '/calendars';

  constructor(private http: HttpClient) { 


  }

  
  getCalendarByBarber(_id: string){
    return this.http.get(this.URL_API + `/calendar/${ _id }`);
  }





}
