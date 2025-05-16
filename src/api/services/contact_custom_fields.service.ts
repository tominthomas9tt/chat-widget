import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Contact_custom_fields, Contact_custom_fieldsFilter } from "../models/contact_custom_fields.model";

@Injectable({
  providedIn: "root",
})
export class Contact_custom_fieldsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/contact_custom_fields";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Contact_custom_fieldsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Contact_custom_fields) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Contact_custom_fields) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
