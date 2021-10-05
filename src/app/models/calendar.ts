export class Calendar {

    constructor(_id = '', userCode = '', barberCode = '', date = null, stateSend = false){
        this._id = _id;
        this.userCode = userCode;
        this.barberCode = barberCode;
        this.date = new Date();
        this.stateSend = stateSend;

    }

    _id: string;
    userCode: string;
    barberCode: string;
    date: Date;
    stateSend: Boolean;
  
}

export interface ICalendar {
  
    _id: string;
    userCode: string;
    barberCode: string;
    date: Date;
    stateSend: Boolean;
   
}
