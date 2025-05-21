import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SendMessagePayload } from './message.interface';
import { CHATSYNK_CONFIG } from './config';
import { SendMessageResponse } from './message.model';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    private baseUrl = CHATSYNK_CONFIG.BASE_URL + "/" + CHATSYNK_CONFIG.VENDOR_ID + "/contact";

    constructor(private http: HttpClient) { }

    sendMessage(payload: SendMessagePayload): Observable<SendMessageResponse> {
        let endpoint = '';

        switch (payload.type) {
            case 'text':
                endpoint = '/send-message';
                break;
            case 'media':
                endpoint = '/send-media-message';
                break;
            case 'template':
                endpoint = '/send-template-message';
                break;
            default:
                return throwError(() => new Error('Unsupported message type'));
        }

        const url = `${this.baseUrl}${endpoint}`;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + CHATSYNK_CONFIG.BEARER_TOKEN,
        });

        payload.from_phone_number_id = CHATSYNK_CONFIG.PHONENUMBER_ID;

        return this.http.post<SendMessageResponse>(url, payload, { headers });
    }
}
