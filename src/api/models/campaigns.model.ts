import { Filter } from '../../mis/models/filter.model';

export class Campaigns {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  title?: string;
  whatsapp_templates__id?: number;
  scheduled_at?: any;
  users__id?: number;
  vendors__id?: number;
  template_name?: string;
  __data?: string;
  template_language?: string;
  timezone?: string;
}

export class CampaignsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  title?: string;
  whatsapp_templates__id?: number;
  scheduled_at?: any;
  users__id?: number;
  vendors__id?: number;
  template_name?: string;
  __data?: string;
  template_language?: string;
  timezone?: string;
}
