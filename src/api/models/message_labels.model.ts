import { Filter } from '../../mis/models/filter.model';

export class Message_labels {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  labels__id?: number;
  whatsapp_message_logs__id?: number;
}

export class Message_labelsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  labels__id?: number;
  whatsapp_message_logs__id?: number;
}
