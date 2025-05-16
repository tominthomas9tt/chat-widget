import { SELECT_MODE } from "../enums";

export class SortItem {
  0: string;
  1: "ASC" | "DESC";
  constructor(field: string, order: "ASC" | "DESC") {
    this[0] = field;
    this[1] = order;
  }
}

export abstract class Filter {

  public dateRangeColumn?: string;

  public dateRangeFrom?: string;

  public dateRangeTo?: string;

  public page?: number;

  public pageLength?: number;

  public sort?: SortItem[];

  public search?: string;

  public searchColumns?: string;

  public selectColumns?: string;

  public selectMode?: SELECT_MODE;

}
