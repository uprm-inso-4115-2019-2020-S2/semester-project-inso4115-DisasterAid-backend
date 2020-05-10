import { User } from './user';

export interface UserResponse {
    message: String;
    users?: User[];
    user?: User;
}
