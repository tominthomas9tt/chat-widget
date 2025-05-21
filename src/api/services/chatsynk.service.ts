import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONSTANTS } from "../configs";

@Injectable({
  providedIn: "root",
})
export class ChatsynkService {
  baseUrl = API_CONSTANTS.SECURE_BASE_URL + "/chatsynk";

  constructor(private http: HttpClient) { }

  uploadVoiceNote(blob: Blob) {
    console.log('MIME type:', blob.type);
    const formData = new FormData();
    formData.append('audio', blob, 'voice-note.webm');

    return this.http.post<{ url: string }>(this.baseUrl + '/audio/upload', formData);
  }

}
