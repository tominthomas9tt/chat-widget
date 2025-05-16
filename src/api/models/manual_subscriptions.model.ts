import { Filter } from '../../mis/models/filter.model';

export class Manual_subscriptions {
  _id?: number;
  _uid?: any;
  status?: string;
  updated_at?: any;
  created_at?: any;
  plan_id?: string;
  ends_at?: any;
  remarks?: string;
  vendors__id?: number;
  charges?: any;
  __data?: string;
  charges_frequency?: string;
}

export class Manual_subscriptionsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: string;
  updated_at?: any;
  created_at?: any;
  plan_id?: string;
  ends_at?: any;
  remarks?: string;
  vendors__id?: number;
  charges?: any;
  __data?: string;
  charges_frequency?: string;
}
