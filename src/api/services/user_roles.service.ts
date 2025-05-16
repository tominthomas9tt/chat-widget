import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { User_roles, User_rolesFilter } from "../models/user_roles.model";

@Injectable({
  providedIn: "root",
})
export class User_rolesService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/user_roles";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: User_rolesFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: User_roles) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: User_roles) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
