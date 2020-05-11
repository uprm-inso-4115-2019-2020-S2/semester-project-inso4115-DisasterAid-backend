import { Donation } from './donation';

export interface SeekResponse {
    donations: Donation[];
    message: String;
}
