export interface ISubscriptions {
  id?: number;
  vendor_model__id?: number;
  type?: string;
  stripe_id?: string;
  stripe_status?: string;
  stripe_price?: string;
  quantity?: number;
  trial_ends_at?: Date;
  ends_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}
