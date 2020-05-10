import { Time } from '@angular/common';

export interface Donation {
    did?: number;
    supplyName: string;
    quantity: number;
    time: Date; // not sure if this is correct type
    unit: string;

}
