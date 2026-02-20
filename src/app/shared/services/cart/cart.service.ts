import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '../../../../enviroment/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartResp } from '../../models/icart';
import { CheckPlateformService } from '../check-plateform/check-plateform.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {

    numberOfProducts: BehaviorSubject<number>=new BehaviorSubject<number>(0);

  httpClient: HttpClient = inject(HttpClient);
  checkPlateformService:CheckPlateformService=inject(CheckPlateformService)


  constructor(){
    if(this.checkPlateformService.checkIsPlateformBrowser()){
          this.getLogedUserCart().subscribe({
      next:res=>{
        this.numberOfProducts.next(res.numOfCartItems)
        console.log(this.numberOfProducts.getValue());
      }
    })
    }

  }


  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(
      `${baseUrl}/api/v1/cart`,
      {
        productId: productId,
      }
    );
  }

  getLogedUserCart(): Observable<CartResp> {
    return this.httpClient.get<CartResp>(`${baseUrl}/api/v1/cart`);
  }

  updataProductCount(priductId: string, count: string): Observable<CartResp> {
    return this.httpClient.put<CartResp>(
      `${baseUrl}/api/v1/cart/${priductId}`,
      {
        count: count,
      }
    );
  }

  removeProduct(productId: string): Observable<CartResp> {
    return this.httpClient.delete<CartResp>(`${baseUrl}/api/v1/cart/${productId}`);
  }


allBrands():Observable<any>{
  return this.httpClient.get<any>(`${baseUrl}/api/v1/brands`);
}

}
