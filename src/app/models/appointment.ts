export class Appointment {

    constructor(_id = '',  nameClient = '', serviceName = '', serviceDate = '', serviceHour = '', nameBarber = '', servicePrice = '', serviceStatus = ''){
        this._id = _id;
        this.nameClient =  nameClient;
        this.serviceName = serviceName;
        this.serviceDate = serviceDate;
        this.serviceHour = serviceHour;
        this.nameBarber = nameBarber;
        this.servicePrice = servicePrice;
        this.serviceStatus = serviceStatus;

    }

    _id: string;
    nameClient: string;
    serviceName: string;
    serviceDate: string;
    serviceHour: string;
    nameBarber: string;
    servicePrice: string;
    serviceStatus: string;

}

export interface IAppointment {
    _id: string;
    nameClient: string;
    serviceName: string;
    serviceDate: string;
    serviceHour: string;
    nameBarber: string;
    servicePrice: string;
    serviceStatus: string;
}
