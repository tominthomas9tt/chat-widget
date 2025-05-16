import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Contact_groups, Contact_groupsFilter } from "../models/contact_groups.model";

@Injectable({
  providedIn: "root",
})
export class Contact_groupsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/contact_groups";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Contact_groupsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Contact_groups) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Contact_groups) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
