import { TemplateComponent, WhatsAppTemplatePayload } from "../whatsapp/interfaces/template.interface";

export interface IWhatsapp_templates {
  _id?: number;
  _uid?: any;
  status?: string;
  template_name?: string;
  updated_at?: any;
  created_at?: any;
  template_id?: string;
  category?: string;
  language?: string;
  __data?: string;
  vendors__id?: number;
}

export function getParsedTemplate(template: IWhatsapp_templates): WhatsAppTemplatePayload | null {
  try {
    if (!template.__data) return null;

    const parsed = JSON.parse(template.__data);

    if (typeof parsed === 'object' && parsed !== null && 'template' in parsed) {
      return parsed.template as WhatsAppTemplatePayload;
    }

    console.warn('Parsed JSON does not contain a `template` field:', parsed);
    return null;
  } catch (e) {
    console.error('Failed to parse __data as JSON:', e);
    return null;
  }
}

export function getParsedComponents(template: IWhatsapp_templates): TemplateComponent[]  | null {
  try {
    if (!template.__data) return null;

    const parsed = JSON.parse(template.__data);

    if (typeof parsed === 'object' && parsed !== null && 'template_components' in parsed) {
      return parsed.template_components as TemplateComponent[];
    }

    console.warn('Parsed JSON does not contain a `template` field:', parsed);
    return null;
  } catch (e) {
    console.error('Failed to parse __data as JSON:', e);
    return null;
  }
}