import { Filter } from '../../mis/models/filter.model';

export class Password_resets {
  _id?: number;
  created_at?: any;
  email?: string;
  token?: string;
}

export class Password_resetsFilter extends Filter {
  _id?: number;
  created_at?: any;
  email?: string;
  token?: string;
}
