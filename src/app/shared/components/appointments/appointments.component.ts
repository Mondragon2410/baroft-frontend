import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAppointment, Appointment} from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';



declare var M: any;


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
  providers: [AppointmentService]
  
})
export class AppointmentsComponent implements OnInit {

  
  appointments: IAppointment[] = []
  public selectedAppointment!: IAppointment;
  
  constructor(public appointmentService: AppointmentService) { }

  ngOnInit(){
    this.appointments = this.appointmentService.Appointments; //aqui va appointments en minisculas
    this.selectedAppointment = this.appointmentService.selectedAppointment;
    this.getAppointments();
  }

  addAppointment(form: NgForm){
    if(form.value._id){
      this.appointmentService.putAppointment(form.value)
       .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Cita actualizada'})
        this.getAppointments();
       })
    }else{

      this.appointmentService.postAppointment(form.value)  
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Cita guardada'})
        this.getAppointments();
      });
    }
    
  }

  getAppointments(){
    this.appointmentService.getAppointments()  
      .subscribe(res => {
        this.appointments = res as IAppointment[];
        
      });
  }

  editAppointment(appointment: Appointment){
    this.selectedAppointment = appointment;
  }

  deleteAppointment(_id: string){
    if(confirm('Esta seguro que quiere eliminarlo?')){

      this.appointmentService.deleteAppointment(_id)
        .subscribe(res => {
          this.getAppointments();
          M.toast({html: 'Cita eliminada'})
      });
    }
  
  }

  resetForm(form?: NgForm){
    if (form){
      form.reset();
      this.appointmentService.selectedAppointment = new Appointment();
    }

  }


}
