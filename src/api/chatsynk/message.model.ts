export interface SendMessageResponse {
  result: 'success' | 'error';
  message: string;
  data: {
    log_uid: string;
    contact_uid: string;
    phone_number: string;
    wamid: string;
    status: string;
  };
}
