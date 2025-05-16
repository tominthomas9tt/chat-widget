import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { isEmpty, jsonToQueryString } from "../../mis/utils";
import { API_CONSTANTS } from "../configs";
import { Failed_jobs, Failed_jobsFilter } from "../models/failed_jobs.model";

@Injectable({
  providedIn: "root",
})
export class Failed_jobsService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/failed_jobs";

  constructor(private http: HttpClient) { }

  getAll(filterConditions: Failed_jobsFilter = {}) {
    let urlQueryParams = "";
    if (!isEmpty(filterConditions)) {
      urlQueryParams = jsonToQueryString(filterConditions);
    }
    return this.http.get(this.baseUrl + urlQueryParams);
  }

  getDetails(id: number) {
    return this.http.get(this.baseUrl + "/" + id);
  }

  create(createData: Failed_jobs) {
    return this.http.post(this.baseUrl, createData);
  }

  update(id: number, updateData: Failed_jobs) {
    return this.http.put(this.baseUrl + "/" + id, updateData);
  }

  softDelete(id: number) {
    return this.http.put(this.baseUrl + "/" + id, { astatus: 1 });
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + "/" + id);
  }
}
