import { Filter } from '../../mis/models/filter.model';

export class Transactions {
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

export class TransactionsFilter extends Filter {
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
