export class Service {

    constructor(_id = '', serviceName = '', serviceType = '', servicePrice = '', serviceTime = ''){
        this._id = _id;
        this.serviceName = serviceName;
        this.serviceType = serviceType;
        this.servicePrice = servicePrice;
        this.serviceTime = serviceTime;

    }

    _id: string;
    serviceName: string;
    serviceType: string;
    servicePrice: string;
    serviceTime: string;
  
}

export interface IService {
    _id: string;
    serviceName: string;
    serviceType: string;
    servicePrice: string;
    serviceTime: string;
   
}


