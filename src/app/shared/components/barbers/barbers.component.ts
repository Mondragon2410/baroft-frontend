import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Barber, IBarber} from 'src/app/models/barber';
import { BarberService } from 'src/app/services/barber.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { NotificationService } from '../../../protected/dashboard/notification.service';
import { AuthService } from '../../../auth/services/auth.service';
import { CalendarService } from '../../../services/calendar.service';
import { UserService } from '../../../services/user.service';
import { ICalendar } from '../../../models/calendar';
import { map } from 'rxjs/operators';
import { Invoice, IInvoice } from '../../../models/invoice';




declare var M: any;



@Component({
  selector: 'app-barbers',
  templateUrl: './barbers.component.html',
  styleUrls: ['./barbers.component.css'],
  providers: [BarberService]
  
})
export class BarbersComponent implements OnInit {

   get user(){      //trae el usuario
    return this.authService.user;
 }
     


  invoices: any = []; 
  seleccionada: any;
  public barberId : string = '6137c11750097855e47d5103';

  public mensaje: string = '';
  public allUsers: any;

  public allUsersFilter: any;

  public calendars: any;
  public clients: any = [];

  barbers: IBarber[] = [];
  barbero: any;
  
  public selectedBarber!: IBarber;

  
  constructor(public invoicesService: InvoiceService,
              public barberService: BarberService,
              private servicioComunicacion: NotificationService,
              private authService: AuthService,
              private calendarService: CalendarService,
              private userService: UserService
              ) { }

  
  
    ngOnInit(){

  
   this.getClients(this.authService.user.uid);
   this.getBarberByUserCode(this.authService.user.uid);      
    this.servicioComunicacion.enviarMensajeObservable.subscribe(mensaje =>{
      this.mensaje = mensaje;
    });

    this.barbers = this.barberService.barbers;
    this.selectedBarber = this.barberService.selectedBarber;
    this.getBarbers();
    this.getAllUsers(); 
    this.getInvoice(this.barberId);
    this.getInvoices();

    
  
  }

  addBarber(form: NgForm){
    if(form.value._id){
      this.barberService.putBarber(form.value)
       .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Barbero actualizado'})
        this.getBarbers();
       })
    }else{

      this.barberService.postBarber(form.value)  //almacena el barbero en el servidor
      .subscribe(res => {
        this.resetForm(form);
        M.toast({html: 'Barbero guardado'})
        this.getBarbers();
      });
    }
    
  }



  getBarbers(){
    this.barberService.getBarbers()  //almacena el barbero en el servidor
      .subscribe(res => {
        this.barbers = res as IBarber[];
        
      });
  }



  getBarber(val: string){
    this.barberService.getBarber(val)  
      .subscribe(res => {
        this.barbero = res;
     
        
      });
  }




   getAllUsers(){
    this.userService.getUsers()
    .subscribe( res => {

     this.allUsers = res? res: null;

     this.allUsersFilter = this.allUsers.filter((res: any) => {

      return res.role === 0

    })
     
    });
  } 

  async getInvoices(){   //trae las facturas
    this.invoices = await this.invoicesService.getInvoices1();
    
    if(this.invoices){
       console.log('son las facturas', this.invoices); 
    }else{
      console.log('vacio');
    }

     this.invoices = this.invoices.filter((res:any) => {

      return res.barberCode == this.authService.user.uid && res.recibed == 0 && res.send == 0;
      

    });
    console.log('fasfaf', this.invoices);
      


}






  getBarberByUserCode(userCode: string){
    this.barberService.getBarberByUserCode(userCode)  
      .subscribe(res => {
        this.barbero = res;
      });
  }



  


  async getInvoice(val: string = this.barberId){
    this.invoices = await this.invoicesService.getInvoice(val);
    if(this.invoices){
      console.log(this.invoices); 
    }else{
      console.log('vacio');
    }
}





  editBarber(barber: Barber){
    this.selectedBarber = barber;
  }


  deleteBarber(_id: string){
    if(confirm('Esta seguro que quiere eliminarlo?')){

      this.barberService.deleteBarber(_id)
        .subscribe(res => {
          this.getBarbers();
          M.toast({html: 'Barbero eliminado'})
      });
    }
  
  }

  resetForm(form?: NgForm){
    if (form){
      form.reset();
      this.barberService.selectedBarber = new Barber();
    }

  }


  recibirCambios(){
    this.mensaje = this.servicioComunicacion.mensaje;
  }


  cambioTexto(mensaje: string){
    this.servicioComunicacion.enviarMensaje(mensaje);
  }


  getCalendarByBarber(_id: string){
    this.calendarService.getCalendarByBarber(_id)
    .subscribe( res =>{
 
        this.calendars = res;
       
        
    });

  }


  getClients(_id: string){
    this.barberService.getBarberByUserCode(_id)  
      .subscribe((res:any) => {
        this.calendarService.getCalendarByBarber(res[0]._id)
        .subscribe( (res:any) =>{
        this.calendars = res;
        let list = new Array();
          this.calendars.forEach((element:any) => {
            this.userService.getUser(element.userCode)
            .subscribe((res: any) => {
              if (res){
                let objClient = {
                  name: res.name,
                  email: res.email,
                  date: element.date
                };
                list.push(objClient);
              }
              this.clients = list 
            }
            )
          });
      });
    });
  } 


  cambioEntendido(invoices: any){
    console.log('si paso',invoices);
    
   
   invoices.send = "1";
   /* invoices.recibed ="1"  */



    this.invoicesService.putInvoice(invoices)
      .subscribe(res =>  {
        console.log('factura actualizada',res);
        
     

    });
  }
}
