import { Filter } from '../../mis/models/filter.model';

export class Whatsapp_message_queue {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  vendors__id?: number;
  scheduled_at?: any;
  __data?: string;
  phone_with_country_code?: string;
  campaigns__id?: number;
  contacts__id?: number;
  retries?: number;
}

export class Whatsapp_message_queueFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  vendors__id?: number;
  scheduled_at?: any;
  __data?: string;
  phone_with_country_code?: string;
  campaigns__id?: number;
  contacts__id?: number;
  retries?: number;
}
