import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Whatsapp_templatesService } from '../../../api/services/whatsapp_templates.service';
import { Whatsapp_templatesFilter } from '../../../api/models/whatsapp_templates.model';
import { IMultiresult, IResponse } from '../../../mis/interfaces/reponse.interface';
import { getParsedTemplate, IWhatsapp_templates } from '../../../api/interfaces/whatsapp_templates.interface';
import { TemplateExample, TemplateHeaderComponent, WhatsAppTemplatePayload } from '../../../api/whatsapp/interfaces/template.interface';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'templates-screen',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './templates-screen.component.html',
  styleUrl: './templates-screen.component.scss'
})
export class TemplatesScreenComponent {
  @Output() back = new EventEmitter<void>();
  @Output() templateSelected = new EventEmitter<WhatsAppTemplatePayload>();

  isLoadingTemplates: boolean = false;
  templates: IWhatsapp_templates[] = [];

  constructor(
    private templatesService: Whatsapp_templatesService
  ) {

  }

  ngOnInit() {
    this.getTemplates();
  }

  getTemplates() {
    let templateFilter: Whatsapp_templatesFilter = {

    };
    this.isLoadingTemplates = true;
    this.templatesService.getAll(templateFilter).subscribe((dataResponse: IResponse<IMultiresult<IWhatsapp_templates>>) => {
      if (dataResponse.status) {
        this.templates = dataResponse.data?.records as IWhatsapp_templates[];
      }
      this.isLoadingTemplates = false;
    })
  }

  parsetemplate(templateData: IWhatsapp_templates) {
    return getParsedTemplate(templateData);
  }

  getExampleMedia(component: TemplateHeaderComponent, key: keyof TemplateExample): string | undefined {
    return component.example?.[key]?.[0]; // safely get first media item if present
  }

  onTemplateSelected(templateData: WhatsAppTemplatePayload | null) {
    if (templateData) {
      this.templateSelected.emit(templateData);
    }
  }


  goBack() {
    this.back.emit();
  }
}
