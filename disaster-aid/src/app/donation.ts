import {MyRequest} from './my-request'

export interface Donation {
    did?: number;
    supplyName: string;
    quantity: number;
    requests?: MyRequest[];
    createdAt: Date; // not sure if this is correct type
    unit: string;
    uid: number;
    user: number;
    city?: String;
}
