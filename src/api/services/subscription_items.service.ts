import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Subscription_items, Subscription_itemsFilter } from "../models/subscription_items.model";

@Injectable({
  providedIn: "root",
})
export class Subscription_itemsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/subscription_items";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Subscription_itemsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Subscription_items) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Subscription_items) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
