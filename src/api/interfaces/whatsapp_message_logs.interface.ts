export interface IWhatsapp_message_logs {
  _id?: number;
  _uid?: any;
  status?: string;
  updated_at?: any;
  created_at?: any;
  message?: string;
  contacts__id?: number;
  campaigns__id?: number;
  vendors__id?: number;
  contact_wa_id?: string;
  wamid?: string;
  wab_phone_number_id?: string;
  is_incoming_message?: number;
  __data?: string;
  messaged_at?: any;
  is_forwarded?: number;
  replied_to_whatsapp_message_logs__uid?: any;
  messaged_by_users__id?: number;
}
