import { Filter } from '../../mis/models/filter.model';

export class Activity_logs {
  _id?: number;
  created_at?: any;
  user_id?: number;
  user_role_id?: number;
  vendor_id?: number;
  activity?: string;
}

export class Activity_logsFilter extends Filter {
  _id?: number;
  created_at?: any;
  user_id?: number;
  user_role_id?: number;
  vendor_id?: number;
  activity?: string;
}
