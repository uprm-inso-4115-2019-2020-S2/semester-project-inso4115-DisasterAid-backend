import {MyRequest} from './my-request'

export interface Donation {
    did?: Number;
    supplyName: String;
    quantity: Number;
    requests?: MyRequest[];
    createdAt?: Date; 
    unit: String;
    uid: Number;
    user?: Number;
}
