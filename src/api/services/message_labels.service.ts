import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Message_labels, Message_labelsFilter } from "../models/message_labels.model";

@Injectable({
  providedIn: "root",
})
export class Message_labelsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/message_labels";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Message_labelsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Message_labels) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Message_labels) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
