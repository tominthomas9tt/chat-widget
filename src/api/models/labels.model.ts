import { Filter } from '../../mis/models/filter.model';

export class Labels {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  title?: string;
  text_color?: string;
  bg_color?: string;
  vendors__id?: number;
}

export class LabelsFilter extends Filter {
  _id?: number;
  _uid?: any;
  status?: number;
  updated_at?: any;
  created_at?: any;
  title?: string;
  text_color?: string;
  bg_color?: string;
  vendors__id?: number;
}
