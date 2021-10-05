import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarbersComponent } from './components/barbers/barbers.component';
import { ListServicesComponent } from './components/list-services/list-services.component';
import { FormsModule } from '@angular/forms';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { MenuComponent } from './components/menu/menu.component';







@NgModule({
  declarations: [
    BarbersComponent,
    ListServicesComponent,
    InvoicesComponent,
    CommentsComponent,
    AppointmentsComponent,
    MenuComponent,
   
    
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    BarbersComponent,
    ListServicesComponent,
    InvoicesComponent,
    CommentsComponent,
    AppointmentsComponent,
    MenuComponent
    
    
  ]
})
export class SharedModule { }
