import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

private authService:AuthService = inject(AuthService)
private router:Router=inject(Router)
errMsg:WritableSignal<string> =signal<string>('')
isLoding:WritableSignal<boolean> =signal<boolean>(false)


  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(20),]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,Validators.pattern(/^[A-Z][a-z0-9]{7,20}$/),]),
    rePassword: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),},this.repasswordMatch
  );





  submitRegisterForm() {
    if (this.registerForm.valid) {
      this.isLoding.set(true)
      this.authService.signUp(this.registerForm.value).subscribe({
      next: res=>{
        this.isLoding.set(false);
        localStorage.setItem('userToken',res.token);
        this.router.navigate(['home']);
        this.authService.decodeingUserData();
        console.log(res);
      },
      error: err =>{
        this.errMsg.set(err.error.message);
        this.isLoding.set(false)

        console.log(this.errMsg());
      }
      })
    }
  }





  repasswordMatch(x: AbstractControl) {
    if (x.get('password')?.value == x.get('rePassword')?.value) {
      return null;
    } else {
      x.get('rePassword')?.setErrors({ notmatch: true });
      return { notmatch: true };
    }
  }
}
