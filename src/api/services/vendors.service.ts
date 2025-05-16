import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Vendors, VendorsFilter } from "../models/vendors.model";

@Injectable({
  providedIn: "root",
})
export class VendorsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/vendors";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: VendorsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Vendors) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Vendors) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
