export interface signUpData extends signInData{
  name: string;
  rePassword: string;
  phone: number;
}
export interface signInData extends forgetPassword{
  password: string;
}
export interface forgetPassword{
  email: string;
}
export interface resetPassword{
  resetCode: string;
}
export interface resetNewPassword extends forgetPassword{
   newPassword: string;
}
