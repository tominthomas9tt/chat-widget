import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Whatsapp_message_queue, Whatsapp_message_queueFilter } from "../models/whatsapp_message_queue.model";

@Injectable({
  providedIn: "root",
})
export class Whatsapp_message_queueService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/whatsapp_message_queue";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Whatsapp_message_queueFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Whatsapp_message_queue) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Whatsapp_message_queue) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
