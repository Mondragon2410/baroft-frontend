import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { InvoiceService } from 'src/app/services/invoice.service';
import { IInvoice, Invoice } from 'src/app/models/invoice';
import { NotificationService } from '../../../protected/dashboard/notification.service';
import { BarberService } from '../../../services/barber.service';
import { IBarber } from 'src/app/models/barber';
import { AuthService } from '../../../auth/services/auth.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../auth/interfaces/interfaces';




declare var M: any;

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css'],
  providers: [InvoiceService]
})
export class InvoicesComponent implements OnInit {

  invoices: IInvoice[] = [];
  public invoicesFilter: any;
  
  barbers: any;
  seleccionada: any;
  public selectedInvoice!: IInvoice;

  public mensaje: string = '';
  
 



  constructor(public barberService: BarberService,
                  public invoiceService: InvoiceService,
                private servicioComunicacion: NotificationService,
                private authService: AuthService,
                private userService: UserService,
                private invoicesService: InvoiceService
                ) { }

ngOnInit(){


    this.getInvoiceByUserCode(this.authService.user.uid);

    this.invoices = this.invoiceService.invoices;
    this.selectedInvoice = this.invoiceService.selectedInvoice;
    this.getInvoices();
    this.getAllBarbers();
    this.getInvoicesFilter();
    
  }

  getInvoiceByUserCode(userCode: string){
    this.invoicesService.getInvoiceByUserCode(userCode)  
      .subscribe(res => {
        this.barbers = res;
      });
  }
  


    addInvoice(form: NgForm){
      /* form.value.barberCode = this.seleccionada; */
      if(form.value._id){
        this.invoiceService.putInvoice(form.value)
         .subscribe(res => {
          this.resetForm(form);
          M.toast({html: 'Factura actualizada'})
          this.getInvoices();
         })
      }else{
        form.value.send = 0;
        form.value.recibed = 0;

        this.invoiceService.postInvoice(form.value)  
        .subscribe(res => {
           console.log(form);
           console.warn(form.value);
          this.resetForm(form);
          M.toast({html: 'Factura guardada'})
          this.getInvoices();

        });
      }
      
    }
  
    getInvoices(){
      this.invoiceService.getInvoices()  
        .subscribe(res => {
          this.invoices = res as IInvoice[];
          
        });
    }

 
    
    getAllBarbers(){   //nuevo para traer barberos
      this.userService.getUsers()
      .subscribe( res => {
  
       this.barbers = res? res: null;
  
       this.barbers = this.barbers.filter((res: any) => {
  
        return res.role === 1
  
      })
       
      });
    } 



  
    editInvoice(invoice: Invoice){
      this.selectedInvoice = invoice;
    }
  
    deleteInvoice(_id: string){
      if(confirm('Esta seguro que quiere eliminarlo?')){
  
        this.invoiceService.deleteInvoice(_id)
          .subscribe(res => {
            this.getInvoices();
            M.toast({html: 'Factura eliminada'})
        });
      }
    
    }
  
    resetForm(form?: NgForm){
      console.log(this.seleccionada);
      if (form){
        form.reset();
        this.invoiceService.selectedInvoice = new Invoice();
      }
  
    }


    async getInvoicesFilter(){   //trae las facturas
      this.invoicesFilter = await this.invoicesService.getInvoices1();
      
      if(this.invoicesFilter){
         console.log('son las facturas', this.invoices); 
      }else{
        console.log('vacio');
      }
  
       this.invoicesFilter = this.invoicesFilter.filter((res:any) => {
  
        return res.recibed == 0 && res.send == 1;
        
  
      });
      console.log('fasfaf', this.invoicesFilter);
        
  
  
  }
 

  cambioEntendidoUser(invoices: any){
    console.log('si paso',invoices);
    
   
   /* invoices.send = "1"; */
    invoices.recibed ="1"  



    this.invoicesService.putInvoice(invoices)
      .subscribe(res =>  {
        console.log('factura actualizada',res);
        
     

    });
  }


}

   
  


