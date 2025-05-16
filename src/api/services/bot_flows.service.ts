import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Bot_flows, Bot_flowsFilter } from "../models/bot_flows.model";

@Injectable({
  providedIn: "root",
})
export class Bot_flowsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/bot_flows";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Bot_flowsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Bot_flows) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Bot_flows) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
