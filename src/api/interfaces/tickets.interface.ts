export interface ITickets {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  contacts__id?: number;
  vendors__id?: number;
  subject?: string;
  description?: string;
  priority?: string;
  vendor_users__id?: number;
  __data?: string;
  assigned_users__id?: number;
}
