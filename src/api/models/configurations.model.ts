import { Filter } from '../../mis/models/filter.model';

export class Configurations {
  _id?: number;
  created_at?: any;
  updated_at?: any;
  name?: string;
  value?: string;
  data_type?: number;
}

export class ConfigurationsFilter extends Filter {
  _id?: number;
  created_at?: any;
  updated_at?: any;
  name?: string;
  value?: string;
  data_type?: number;
}
