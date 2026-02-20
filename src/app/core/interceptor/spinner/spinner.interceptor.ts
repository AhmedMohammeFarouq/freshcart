import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  //display spinner
  const ngxSpinnerService:NgxSpinnerService=inject(NgxSpinnerService)
  ngxSpinnerService.show()
  return next(req).pipe(finalize(()=>{
    ngxSpinnerService.hide();
  }))
  //hidde spinner
};
