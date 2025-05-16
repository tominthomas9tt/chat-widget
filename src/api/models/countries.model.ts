import { Filter } from '../../mis/models/filter.model';

export class Countries {
  _id?: number;
  iso_code?: any;
  name_capitalized?: string;
  name?: string;
  iso3_code?: any;
  iso_num_code?: number;
  phone_code?: number;
}

export class CountriesFilter extends Filter {
  _id?: number;
  iso_code?: any;
  name_capitalized?: string;
  name?: string;
  iso3_code?: any;
  iso_num_code?: number;
  phone_code?: number;
}
