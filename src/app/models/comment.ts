export class Comment {

    constructor(_id = '', nameClient = '', serviceName = '', serviceType = '', serviceComments = ''){
        this._id = _id;
        this.nameClient = nameClient;
        this.serviceName = serviceName
        this.serviceType = serviceType;
        this.serviceComments = serviceComments;

    }

    _id: string;
    nameClient: string;
    serviceName: string;
    serviceType: string;
    serviceComments: string;
  
}

export interface IComment {
    _id: string;
    nameClient: string;
    serviceName: string;
    serviceType: string;
    serviceComments: string;
  
}
