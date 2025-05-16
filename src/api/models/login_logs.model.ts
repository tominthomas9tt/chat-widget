import { Filter } from '../../mis/models/filter.model';

export class Login_logs {
  _id?: number;
  created_at?: any;
  updated_at?: any;
  email?: string;
  role?: number;
  user_id?: number;
  ip_address?: string;
}

export class Login_logsFilter extends Filter {
  _id?: number;
  created_at?: any;
  updated_at?: any;
  email?: string;
  role?: number;
  user_id?: number;
  ip_address?: string;
}
