import { Filter } from '../../mis/models/filter.model';

export class Contact_groups {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  title?: string;
  description?: string;
  vendors__id?: number;
}

export class Contact_groupsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  title?: string;
  description?: string;
  vendors__id?: number;
}
