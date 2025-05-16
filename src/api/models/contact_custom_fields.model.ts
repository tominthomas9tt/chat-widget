import { Filter } from '../../mis/models/filter.model';

export class Contact_custom_fields {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  input_name?: string;
  input_type?: string;
  vendors__id?: number;
}

export class Contact_custom_fieldsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  input_name?: string;
  input_type?: string;
  vendors__id?: number;
}
