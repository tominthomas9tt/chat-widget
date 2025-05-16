import { Filter } from '../../mis/models/filter.model';

export class Pages {
  _id?: number;
  _uid?: any;
  created_at?: any;
  updated_at?: any;
  status?: number;
  title?: string;
  show_in_menu?: number;
  content?: string;
  type?: number;
  vendors__id?: number;
  slug?: string;
  image_name?: string;
}

export class PagesFilter extends Filter {
  _id?: number;
  _uid?: any;
  created_at?: any;
  updated_at?: any;
  status?: number;
  title?: string;
  show_in_menu?: number;
  content?: string;
  type?: number;
  vendors__id?: number;
  slug?: string;
  image_name?: string;
}
