import { Filter } from '../../mis/models/filter.model';

export class Jobs {
  id?: number;
  queue?: string;
  payload?: string;
  attempts?: number;
  reserved_at?: number;
  available_at?: number;
  created_at?: number;
}

export class JobsFilter extends Filter {
  id?: number;
  queue?: string;
  payload?: string;
  attempts?: number;
  reserved_at?: number;
  available_at?: number;
  created_at?: number;
}
