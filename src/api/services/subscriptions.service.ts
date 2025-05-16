import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Subscriptions, SubscriptionsFilter } from "../models/subscriptions.model";

@Injectable({
  providedIn: "root",
})
export class SubscriptionsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/subscriptions";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: SubscriptionsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Subscriptions) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Subscriptions) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
