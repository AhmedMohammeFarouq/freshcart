import { HttpInterceptorFn } from '@angular/common/http';
import { CheckPlateformService } from '../../../shared/services/check-plateform/check-plateform.service';
import { inject } from '@angular/core';

export const addHeaderInterceptor: HttpInterceptorFn = (req, next) => {

  const checkPlateformService:CheckPlateformService=inject(CheckPlateformService)

  
if(req.url.includes('cart')||req.url.includes('orders')||req.url.includes('wishlist')){
  if(checkPlateformService.checkIsPlateformBrowser()){
  req=req.clone({
    headers:req.headers.set('token',localStorage.getItem("userToken")||'')
  })
  }
}


  return next(req);
};
