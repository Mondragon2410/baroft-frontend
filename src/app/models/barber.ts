export class Barber {

    constructor(img= '' , _id = '', name = '', barberType = '', email = '', phone = '', sex = ''){
        this.img = img;
        this._id = _id;
        this.name = name;
        this.barberType = barberType;
        this.email = email;
        this.phone = phone;
        this.sex = sex

    }

    img: string;
    _id: string;
    name: string;
    barberType: string;
    email: string;
    phone: string;
    sex: string;
}

export interface IBarber {
    img: string;
    _id: string;
    name: string;
    barberType: string;
    email: string;
    phone: any;
    sex: string;
}
