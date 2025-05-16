import { Filter } from '../../mis/models/filter.model';

export class Bot_replies {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  vendors__id?: number;
  name?: string;
  reply_text?: string;
  trigger_type?: string;
  reply_trigger?: string;
  priority_index?: number;
  __data?: string;
  bot_flows__id?: number;
  bot_replies__id?: number;
}

export class Bot_repliesFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  vendors__id?: number;
  name?: string;
  reply_text?: string;
  trigger_type?: string;
  reply_trigger?: string;
  priority_index?: number;
  __data?: string;
  bot_flows__id?: number;
  bot_replies__id?: number;
}
