import { Component, Inject, inject, signal, WritableSignal } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetnewpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './resetnewpassword.component.html',
  styleUrl: './resetnewpassword.component.scss',
})
export class ResetnewpasswordComponent {
  router: Router = Inject(Router);

  private authService: AuthService = inject(AuthService);
  errMsg: WritableSignal<string> = signal<string>('');
  isLoding: WritableSignal<boolean> = signal<boolean>(false);

  resetNewPasswordForm: FormGroup = new FormGroup({
    email: new FormControl({ value: localStorage.getItem('userEmail'), disabled: true }),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/)]),
  });

  sendNewPassword() {
    if (this.resetNewPasswordForm.valid) {
      this.isLoding.set(true);

      this.authService.resetNewPassword(this.resetNewPasswordForm.getRawValue()).subscribe({
        next: (res) => {
          this.isLoding.set(false);
          localStorage.setItem('userToken', res.value);
          this.authService.decodeingUserData();

          this.router.navigate(['home'])

          console.log(res);
        },
        error: (err) => {
          this.isLoding.set(false);
          this.errMsg.set(err.error.message);
          console.log(err);
        },
      });
    }
  }
}
