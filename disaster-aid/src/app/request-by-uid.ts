import { MyRequest } from './my-request';

export interface RequestByUID {
    message: string;
    requests: MyRequest[];
}