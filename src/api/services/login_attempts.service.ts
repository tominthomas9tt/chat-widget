import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Login_attempts, Login_attemptsFilter } from "../models/login_attempts.model";

@Injectable({
  providedIn: "root",
})
export class Login_attemptsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/login_attempts";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Login_attemptsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Login_attempts) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Login_attempts) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
