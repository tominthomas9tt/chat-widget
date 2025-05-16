import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { User_settings, User_settingsFilter } from "../models/user_settings.model";

@Injectable({
  providedIn: "root",
})
export class User_settingsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/user_settings";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: User_settingsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: User_settings) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: User_settings) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
