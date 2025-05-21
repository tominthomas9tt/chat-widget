import { MESSAGE_TYPE } from "./type.enum.ts";

export interface ContactInfo {
    first_name: string;
    last_name: string;
    email: string;
    country: string;
    language_code: string;
    groups: string;
    custom_fields?: Record<string, string>[]; // Only for text message
}

interface BaseMessagePayload {
    from_phone_number_id?: string;
    phone_number: string;
    contact?: ContactInfo;
}

export interface TextMessagePayload extends BaseMessagePayload {
    type: MESSAGE_TYPE.TEXT;
    message_body: string;
}

export interface MediaMessagePayload extends BaseMessagePayload {
    type: MESSAGE_TYPE.MEDIA;
    media_type: 'image' | 'video' | 'document' | 'audio';
    media_url: string;
    caption?: string;
    file_name?: string;
}

export interface TemplateMessagePayload extends BaseMessagePayload {
    type: MESSAGE_TYPE.TEMPLATE;
    template_name: string;
    template_language: string;
    header_image?: string;
    header_video?: string;
    header_document?: string;
    header_document_name?: string;
    header_field_1?: string;
    location_latitude?: string;
    location_longitude?: string;
    location_name?: string;
    location_address?: string;
    field_1?: string;
    field_2?: string;
    field_3?: string;
    field_4?: string;
    button_0?: string;
    button_1?: string;
    copy_code?: string;
}

export type SendMessagePayload =
    | TextMessagePayload
    | MediaMessagePayload
    | TemplateMessagePayload;
