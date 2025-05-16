import { Filter } from '../../mis/models/filter.model';

export class Vendor_users {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  vendors__id?: number;
  users__id?: number;
  __data?: string;
}

export class Vendor_usersFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  vendors__id?: number;
  users__id?: number;
  __data?: string;
}
