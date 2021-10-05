export class Invoice {

    constructor(_id = '', barbershopName= '' ,barbershopAddress = '', serviceType = '', serviceTime = '', servicePrice= '', barberCode= '', send = '', recibed = ''){
        this._id = _id;
        this.barbershopName = barbershopName;
        this.barbershopAddress = barbershopAddress;
        this.serviceType = serviceType;
        this.serviceTime = serviceTime;
        this.servicePrice = servicePrice;
        this.barberCode = barberCode;
        this.send = send;
        this.recibed = recibed;
       

    }

    _id: string;
    barbershopName: string;
    barbershopAddress: string;
    serviceType: string;
    serviceTime: string;
    servicePrice: string;
    barberCode: string;
    send: string;
    recibed: string;
  
}

export interface IInvoice {
    _id: string;
    barbershopName: string;
    barbershopAddress: string;
    serviceType: string;
    serviceTime: string;
    servicePrice: string;
    barberCode: string;
    send: string;
    recibed: string;
   
}
