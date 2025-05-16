import { Filter } from '../../mis/models/filter.model';

export class Subscription_items {
  id?: number;
  stripe_id?: string;
  stripe_product?: string;
  stripe_price?: string;
  quantity?: number;
  created_at?: Date;
  updated_at?: Date;
  subscription_id?: number;
}

export class Subscription_itemsFilter extends Filter {
  id?: number;
  stripe_id?: string;
  stripe_product?: string;
  stripe_price?: string;
  quantity?: number;
  created_at?: Date;
  updated_at?: Date;
  subscription_id?: number;
}
