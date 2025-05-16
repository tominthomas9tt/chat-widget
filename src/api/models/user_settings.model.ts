import { Filter } from '../../mis/models/filter.model';

export class User_settings {
  _id?: number;
  created_at?: any;
  updated_at?: any;
  key_name?: string;
  value?: string;
  data_type?: number;
  users__id?: number;
}

export class User_settingsFilter extends Filter {
  _id?: number;
  created_at?: any;
  updated_at?: any;
  key_name?: string;
  value?: string;
  data_type?: number;
  users__id?: number;
}
