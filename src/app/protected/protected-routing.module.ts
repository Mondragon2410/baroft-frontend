import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AppointmentsComponent } from '../shared/components/appointments/appointments.component';
import { BarbersComponent } from '../shared/components/barbers/barbers.component';
import { CommentsComponent } from '../shared/components/comments/comments.component';
import { InvoicesComponent } from '../shared/components/invoices/invoices.component';
import { ListServicesComponent } from '../shared/components/list-services/list-services.component';

const routes: Routes = [

  {
    path: '',
    children:[
      {path: '', component: DashboardComponent},
      {path: 'appointments', component: AppointmentsComponent},
      {path: 'barbers', component: BarbersComponent},
      {path: 'comments', component: CommentsComponent},
      {path: 'invoices', component: InvoicesComponent},
      {path: 'list-services', component: ListServicesComponent},
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtectedRoutingModule { }
