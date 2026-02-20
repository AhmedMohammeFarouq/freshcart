import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { resetPassword } from '../../../../shared/models/data';
import { ResetnewpasswordComponent } from '../resetnewpassword/resetnewpassword.component';

@Component({
  selector: 'app-resetcode',
  imports: [ReactiveFormsModule,ResetnewpasswordComponent],
  templateUrl: './resetcode.component.html',
  styleUrl: './resetcode.component.scss',
})
export class ResetcodeComponent {
  resetNewPasswortFalg: WritableSignal<boolean> = signal<boolean>(false);
  resetPasswortFalg: WritableSignal<boolean> = signal<boolean>(true);

  private authService: AuthService = inject(AuthService);
  errMsg: WritableSignal<string> = signal<string>('');
  isLoding: WritableSignal<boolean> = signal<boolean>(false);

  resetCodeFormGroup: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required,Validators.pattern(/^[0-9]{4,}$/)]),
  });

  send() {
    if (this.resetCodeFormGroup.valid) {
      this.isLoding.set(true);

      this.authService.resetPassword(this.resetCodeFormGroup.value).subscribe({
        next: (res) => {
          this.isLoding.set(false);
          this.resetPasswortFalg.set(false)
          this.resetNewPasswortFalg.set(true)
          console.log(res);
        },
        error: (err) => {
          this.isLoding.set(false);
          this.errMsg.set(err.error.message)
          console.log(err);
        },
      });
    }
  }
}
