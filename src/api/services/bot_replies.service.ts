import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Bot_replies, Bot_repliesFilter } from "../models/bot_replies.model";

@Injectable({
  providedIn: "root",
})
export class Bot_repliesService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/bot_replies";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Bot_repliesFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Bot_replies) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Bot_replies) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
