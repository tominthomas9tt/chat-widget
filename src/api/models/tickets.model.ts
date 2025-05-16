import { Filter } from '../../mis/models/filter.model';

export class Tickets {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  contacts__id?: number;
  vendors__id?: number;
  subject?: string;
  description?: string;
  priority?: string;
  vendor_users__id?: number;
  __data?: string;
  assigned_users__id?: number;
}

export class TicketsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  contacts__id?: number;
  vendors__id?: number;
  subject?: string;
  description?: string;
  priority?: string;
  vendor_users__id?: number;
  __data?: string;
  assigned_users__id?: number;
}
