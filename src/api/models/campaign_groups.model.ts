import { Filter } from '../../mis/models/filter.model';

export class Campaign_groups {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  campaigns__id?: number;
  contact_groups__id?: number;
}

export class Campaign_groupsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  campaigns__id?: number;
  contact_groups__id?: number;
}
