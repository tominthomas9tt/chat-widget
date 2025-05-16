import { Filter } from '../../mis/models/filter.model';

export class Vendor_settings {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  vendors__id?: number;
  name?: string;
  value?: string;
  data_type?: number;
}

export class Vendor_settingsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  vendors__id?: number;
  name?: string;
  value?: string;
  data_type?: number;
}
