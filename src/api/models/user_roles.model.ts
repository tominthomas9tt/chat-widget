import { Filter } from '../../mis/models/filter.model';

export class User_roles {
  _id?: number;
  _uid?: any;
  status?: number;
  created_at?: any;
  updated_at?: any;
  title?: string;
}

export class User_rolesFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  created_at?: any;
  updated_at?: any;
  title?: string;
}
