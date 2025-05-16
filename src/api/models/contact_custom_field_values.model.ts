import { Filter } from '../../mis/models/filter.model';

export class Contact_custom_field_values {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  contacts__id?: number;
  contact_custom_fields__id?: number;
  field_value?: string;
}

export class Contact_custom_field_valuesFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  contacts__id?: number;
  contact_custom_fields__id?: number;
  field_value?: string;
}
