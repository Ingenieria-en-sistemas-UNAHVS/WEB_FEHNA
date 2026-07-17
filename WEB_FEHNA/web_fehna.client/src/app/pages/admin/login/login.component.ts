import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ButtonDirective} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Message} from 'primeng/message';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ButtonDirective, InputText, Message],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  readonly error = signal('');

  constructor(private auth: AuthService, private router: Router) {
  }

  submit(): void {
    this.error.set('');
    const ok = this.auth.login(this.email, this.password);
    if (ok) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.error.set('Correo o contraseña incorrectos.');
    }
  }
}
