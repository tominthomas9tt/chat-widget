import { Filter } from '../../mis/models/filter.model';

export class Login_attempts {
  _id?: number;
  created_at?: any;
  updated_at?: any;
  ip_address?: string;
  attempts?: number;
}

export class Login_attemptsFilter extends Filter {
  _id?: number;
  created_at?: any;
  updated_at?: any;
  ip_address?: string;
  attempts?: number;
}
