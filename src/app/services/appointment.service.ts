import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/appointment';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  Appointments: Appointment[] = []; 
  selectedAppointment: Appointment;
  readonly URL_API = environment.baseUrl + '/appointments';


  constructor(private http: HttpClient) { 

    this.selectedAppointment = new Appointment();
  }

  getAppointments(){
   
    return this.http.get(this.URL_API)
  }

  postAppointment(Appointment: Appointment){
    return this.http.post(this.URL_API, Appointment);
  }

  putAppointment(appointment: Appointment){
    return this.http.put(this.URL_API + `/${appointment._id}`, appointment);
  }

  deleteAppointment(_id: string){
    return this.http.delete(this.URL_API + `/${ _id }`);

  }
  
}
