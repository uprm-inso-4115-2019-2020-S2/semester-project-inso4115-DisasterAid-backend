import { Donation } from './donation';

export interface DonationResponse {
    message: String;
    donation: Donation[];
    city?: String;
}
