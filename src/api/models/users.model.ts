import { Filter } from '../../mis/models/filter.model';

export class Users {
  _id?: number;
  _uid?: any;
  created_at?: any;
  updated_at?: any;
  username?: string;
  email?: string;
  password?: string;
  status?: number;
  remember_token?: string;
  first_name?: string;
  last_name?: string;
  mobile_number?: string;
  timezone?: string;
  registered_via?: string;
  ban_reason?: string;
  countries__id?: number;
  two_factor_secret?: string;
  two_factor_recovery_codes?: string;
  email_verified_at?: any;
  user_roles__id?: number;
  vendors__id?: number;
}

export class UsersFilter extends Filter {
  _id?: number;
  _uid?: any;
  created_at?: any;
  updated_at?: any;
  username?: string;
  email?: string;
  password?: string;
  status?: number;
  remember_token?: string;
  first_name?: string;
  last_name?: string;
  mobile_number?: string;
  timezone?: string;
  registered_via?: string;
  ban_reason?: string;
  countries__id?: number;
  two_factor_secret?: string;
  two_factor_recovery_codes?: string;
  email_verified_at?: any;
  user_roles__id?: number;
  vendors__id?: number;
}
