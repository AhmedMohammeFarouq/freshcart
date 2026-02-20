import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private router:Router=inject(Router)
  errMsg: WritableSignal<string> = signal<string>('');
  isLoding: WritableSignal<boolean> = signal<boolean>(false);

  loginFormGroupe: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/),
    ]),
  });

  subBut() {
    if (this.loginFormGroupe.valid) {
      this.isLoding.set(true);
      this.authService.logIn(this.loginFormGroupe.value).subscribe({
        next: (res) => {
          this.isLoding.set(false);
          localStorage.setItem('userToken',res.token)
          this.router.navigate(['home'])
          this.authService.decodeingUserData()
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
