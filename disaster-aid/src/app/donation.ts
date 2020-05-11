import {MyRequest} from './my-request'

export interface Donation {
    did?: number;
    supplyName: string;
    quantity: number;
    requests?: MyRequest[];
    createdAt: Date; 
    unit: string;
    uid: number;
    user: number;
    city?: String;
}
