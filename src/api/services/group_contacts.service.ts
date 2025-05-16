import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Group_contacts, Group_contactsFilter } from "../models/group_contacts.model";

@Injectable({
  providedIn: "root",
})
export class Group_contactsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/group_contacts";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Group_contactsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Group_contacts) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Group_contacts) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
