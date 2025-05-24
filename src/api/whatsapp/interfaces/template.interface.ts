export type TemplateCategory = 'UTILITY' | 'MARKETING' | 'TRANSACTIONAL';
export type ParameterFormat = 'POSITIONAL' | 'NAMED';
export type TemplateLanguage = string; // e.g., 'en_US'

export type ComponentType = 'HEADER' | 'BODY' | 'FOOTER' | 'BUTTONS';
export type HeaderFormat = 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT';
export type ButtonType = 'QUICK_REPLY' | 'URL' | 'PHONE_NUMBER';

export interface TemplateExample {
    header_text?: string[];
    body_text?: string[];
    footer_text?: string[];
    header_handle?: string[]; // For media
}

export interface TemplateHeaderComponent {
    type: 'HEADER';
    format: HeaderFormat;
    text?: string; // Required if format is TEXT
    example?: TemplateExample;
}

export interface TemplateBodyComponent {
    type: 'BODY';
    text: string;
    example?: TemplateExample;
}

export interface TemplateFooterComponent {
    type: 'FOOTER';
    text: string;
}

export interface TemplateButtonQuickReply {
    type: 'QUICK_REPLY';
    text: string; // 20 characters max
}

export interface TemplateButtonUrl {
    type: 'URL';
    text: string; // Button label
    url: string; // Can contain placeholder like {{1}}
}

export interface TemplateButtonPhoneNumber {
    type: 'PHONE_NUMBER';
    text: string; // Button label
    phone_number: string;
}

export interface TemplateButtonsComponent {
    type: 'BUTTONS';
    buttons: (TemplateButtonQuickReply | TemplateButtonUrl | TemplateButtonPhoneNumber)[];
}

export type TemplateComponent =
    | TemplateHeaderComponent
    | TemplateBodyComponent
    | TemplateFooterComponent
    | TemplateButtonsComponent;

export interface WhatsAppTemplatePayload {
    name: string; // Template name (max 512 chars)
    language: TemplateLanguage; // Locale code (e.g., en_US)
    category: TemplateCategory; // Category of template
    parameter_format?: ParameterFormat; // Default: POSITIONAL
    library_template_name?: string; // Optional predefined template reference
    components: TemplateComponent[];
}
