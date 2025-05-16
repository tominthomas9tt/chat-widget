import { Filter } from '../../mis/models/filter.model';

export class Failed_jobs {
  id?: number;
  uuid?: string;
  connection?: string;
  queue?: string;
  payload?: string;
  exception?: string;
  failed_at?: Date;
}

export class Failed_jobsFilter extends Filter {
  id?: number;
  uuid?: string;
  connection?: string;
  queue?: string;
  payload?: string;
  exception?: string;
  failed_at?: Date;
}
