import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice, IInvoice } from '../models/invoice';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  invoices: Invoice[] = [];
  selectedInvoice: Invoice;
  readonly URL_API = environment.baseUrl + '/invoices';


  constructor(private http: HttpClient) { 

    this.selectedInvoice = new Invoice();
  }
  
  async getInvoices1() {
    const res = await  this.http.get(this.URL_API)
      .toPromise();
      console.log(res);
    return res;
  }


  
  
  getInvoices(){
    
    return this.http.get(this.URL_API)
  }

  postInvoice(Invoice: Invoice){
    console.log(this.http.post(this.URL_API, Invoice));
    return this.http.post(this.URL_API, Invoice);
  }

  putInvoice(invoice: Invoice){
    return this.http.put(this.URL_API + `/${invoice._id}`, invoice);
  }

  deleteInvoice(_id: string){
    return this.http.delete(this.URL_API + `/${ _id }`);

  }
  
  getInvoice(_id: string){
    
    return this.http.get(this.URL_API + `/${ _id }`);
  }

  getInvoiceByUserCode(_id: string){
    return this.http.get(this.URL_API + `/userCode/${ _id }`);
  }
  
}
