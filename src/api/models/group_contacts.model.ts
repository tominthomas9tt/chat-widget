import { Filter } from '../../mis/models/filter.model';

export class Group_contacts {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  contact_groups__id?: number;
  contacts__id?: number;
}

export class Group_contactsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  contact_groups__id?: number;
  contacts__id?: number;
}
