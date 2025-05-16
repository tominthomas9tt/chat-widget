import { Filter } from '../../mis/models/filter.model';

export class Bot_flows {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  title?: string;
  vendors__id?: number;
  __data?: string;
  start_trigger?: string;
}

export class Bot_flowsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  title?: string;
  vendors__id?: number;
  __data?: string;
  start_trigger?: string;
}
