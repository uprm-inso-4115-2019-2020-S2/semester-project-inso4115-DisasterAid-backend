import { Donation } from './donation';

export interface DonationResponse {
    message: String;
    donations?: Donation[];
    donation?: Donation;
    city?: String;
}
