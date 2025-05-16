import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Login_logs, Login_logsFilter } from "../models/login_logs.model";

@Injectable({
  providedIn: "root",
})
export class Login_logsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/login_logs";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Login_logsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Login_logs) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Login_logs) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
