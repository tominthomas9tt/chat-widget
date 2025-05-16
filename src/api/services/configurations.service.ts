import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Configurations, ConfigurationsFilter } from "../models/configurations.model";

@Injectable({
  providedIn: "root",
})
export class ConfigurationsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/configurations";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: ConfigurationsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Configurations) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Configurations) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
