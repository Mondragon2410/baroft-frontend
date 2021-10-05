import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';
import { IService, Service } from 'src/app/models/service';


declare var M: any;


@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css'],
  providers: [ServiceService]
})
export class ListServicesComponent implements OnInit {

  services: IService[] = []
  public selectedService!: IService;
  public userData: any;

  constructor(public serviceService: ServiceService) { }

  ngOnInit(): void {
    this.services = this.serviceService.services;
    this.selectedService = this.serviceService.selectedService;
    this.getServices();
  }

  
  
  
  
  
  addService(form: NgForm){
    if(form.value._id){
      this.serviceService.putService(form.value)
       .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Servicio actualizado'})
        this.getServices();
       })
    }else{

      this.serviceService.postService(form.value)  
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Servicio guardado'})
        this.getServices();
      });
    }
    
  }

  getServices(){
    this.serviceService.getServices()  
      .subscribe(res => {
        this.services = res as IService[];
        
      });
  }

  editService(service: Service){
    this.selectedService = service;
  }

  deleteService(_id: string){
    if(confirm('Esta seguro que quiere eliminarlo?')){

      this.serviceService.deleteService(_id)
        .subscribe(res => {
          this.getServices();
          M.toast({html: 'Servicio eliminado'})
      });
    }
  
  }

  resetForm(form?: NgForm){
    if (form){
      form.reset();
      this.serviceService.selectedService = new Service();
    }

  }

}
