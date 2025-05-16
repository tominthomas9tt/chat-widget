import { Filter } from '../../mis/models/filter.model';

export class Contact_labels {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  labels__id?: number;
  contacts__id?: number;
}

export class Contact_labelsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  labels__id?: number;
  contacts__id?: number;
}
