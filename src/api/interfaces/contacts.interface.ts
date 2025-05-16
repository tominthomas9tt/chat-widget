export interface IContacts {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  first_name?: string;
  last_name?: string;
  countries__id?: number;
  whatsapp_opt_out?: number;
  phone_verified_at?: any;
  email?: string;
  email_verified_at?: any;
  vendors__id?: number;
  wa_id?: string;
  language_code?: string;
  disable_ai_bot?: number;
  __data?: string;
  assigned_users__id?: number;
}
