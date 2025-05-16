import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Contact_labels, Contact_labelsFilter } from "../models/contact_labels.model";

@Injectable({
  providedIn: "root",
})
export class Contact_labelsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/contact_labels";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Contact_labelsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Contact_labels) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Contact_labels) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
