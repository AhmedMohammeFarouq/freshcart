import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl, host } from '../../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import {CachOrder, ShippingAddress} from '../.././../shared/models/ipay'
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  httpClient:HttpClient= inject(HttpClient)


  shippingAddress(idCart:string,data:ShippingAddress):Observable<CachOrder>{
    return this.httpClient.post<any>(`${baseUrl}/api/v1/orders/${idCart}`, {
      shippingAddress:data,
    });
  }


  shippingAddressOnline(idCart:string,data:ShippingAddress):Observable<any>{
    return this.httpClient.post(`${baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${host}`, {
      shippingAddress:data,
    });
  }

  getAllOrders(userId:string):Observable<any>{
    return this.httpClient.get(`${baseUrl}/api/v1/orders/user/${userId}`);
  }

}
