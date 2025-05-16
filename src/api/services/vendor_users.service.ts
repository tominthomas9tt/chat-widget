import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Vendor_users, Vendor_usersFilter } from "../models/vendor_users.model";

@Injectable({
  providedIn: "root",
})
export class Vendor_usersService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/vendor_users";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Vendor_usersFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Vendor_users) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Vendor_users) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
