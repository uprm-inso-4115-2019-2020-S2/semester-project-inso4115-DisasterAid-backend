import { Time} from '@angular/common';

export interface Request {
  did?: number;
  quantity: number;
  supplyName: string;
  time: Time;
  status: boolean;
  description: string;
}
