import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Password_resets, Password_resetsFilter } from "../models/password_resets.model";

@Injectable({
  providedIn: "root",
})
export class Password_resetsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/password_resets";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Password_resetsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Password_resets) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Password_resets) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
