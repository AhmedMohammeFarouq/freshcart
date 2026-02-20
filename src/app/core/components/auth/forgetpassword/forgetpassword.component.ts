import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ResetcodeComponent } from '../resetcode/resetcode.component';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule, ResetcodeComponent],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss',
})
export class ForgetpasswordComponent {
  forgetPasswortFalg: WritableSignal<boolean> = signal<boolean>(true);
  resetPasswortFalg: WritableSignal<boolean> = signal<boolean>(false);

  private authService: AuthService = inject(AuthService);
  errMsg: WritableSignal<string> = signal<string>('');
  isLoding: WritableSignal<boolean> = signal<boolean>(false);

  forgetPasswordFormGroupe: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  sendEmail() {
    if (this.forgetPasswordFormGroupe.value) {
      this.isLoding.set(true);
      this.authService.forgerPassword(this.forgetPasswordFormGroupe.value).subscribe({
        next: (res) => {
          console.log(this.forgetPasswordFormGroupe.get('email')?.value);
          localStorage.setItem('userEmail',this.forgetPasswordFormGroupe.get('email')?.value)
          this.errMsg.set(res.message);
          this.isLoding.set(false);
          this.forgetPasswortFalg.set(false);
          this.resetPasswortFalg.set(true);
        },
        error: (err) => {
          this.errMsg.set(err.error.message);
          this.isLoding.set(false);
        },
      });
    }
  }
}
