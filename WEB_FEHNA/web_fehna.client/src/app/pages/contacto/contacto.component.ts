import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';
import {Select} from 'primeng/select';
import {Message} from 'primeng/message';

const SUBJECT_OPTIONS = [
  'Afiliación de nadador',
  'Consulta de competencias',
  'Alianzas y patrocinio',
  'Otro',
];

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, ButtonDirective, InputText, Textarea, Select, Message],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css',
})
export class ContactoComponent {
  readonly subjectOptions = SUBJECT_OPTIONS;
  form = {name: '', email: '', subject: 'Afiliación de nadador', message: ''};
  sent = false;

  submit(): void {
    // Placeholder until the real API endpoint exists: POST /api/contact
    this.sent = true;
    this.form = {name: '', email: '', subject: 'Afiliación de nadador', message: ''};
  }
}
