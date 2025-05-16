export interface ITransactions {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  amount?: any;
  reference_id?: string;
  notes?: string;
  __data?: string;
  vendors__id?: number;
  subscriptions_id?: number;
  type?: string;
  manual_subscriptions__id?: number;
}
