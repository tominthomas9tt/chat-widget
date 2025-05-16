import { Filter } from '../../mis/models/filter.model';

export class Whatsapp_templates {
  _id?: number;
  _uid?: any;
  status?: string;
  template_name?: string;
  updated_at?: any;
  created_at?: any;
  template_id?: string;
  category?: string;
  language?: string;
  __data?: string;
  vendors__id?: number;
}

export class Whatsapp_templatesFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: string;
  template_name?: string;
  updated_at?: any;
  created_at?: any;
  template_id?: string;
  category?: string;
  language?: string;
  __data?: string;
  vendors__id?: number;
}
