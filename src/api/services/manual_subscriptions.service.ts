import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Manual_subscriptions, Manual_subscriptionsFilter } from "../models/manual_subscriptions.model";

@Injectable({
  providedIn: "root",
})
export class Manual_subscriptionsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/manual_subscriptions";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Manual_subscriptionsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Manual_subscriptions) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Manual_subscriptions) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
