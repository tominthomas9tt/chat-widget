interface IMisError {
  error?: string;
  code?: string;
  message?: string;
  details?: string;
  stack?: any;
  defaultMessage?: string;
  showMessageToUser?: boolean;
}

interface IMultiresultMetaData {
  totalRecords: number;
  previous?: number;
  currentPage?: number;
  next?: number;
  perPage?: number;
  segment?: number;
  lastPage?: number;
}

interface IMultiresult<T> {
  records: T[];
  pager: IMultiresultMetaData;
}

interface IResponse<T> {
  status?: number;
  data?: T | null;
  error?: IMisError;
  infoDtls?: any;
}

export { IMultiresultMetaData, IMultiresult, IResponse, IMisError };
