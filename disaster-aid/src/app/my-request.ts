import { Donation } from './donation';
import { User } from './user';

export interface MyRequest {
    rId?: Number;
    supplyName: String;
    time: Date;
    status: string;
    description: String;
    donation?: Donation;
    user?: User;
    uid: Number;
    did: Number;
}
