import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { AllProdutc, Produts } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {


  constructor( private httpClient:HttpClient ){}

  getAllProducts():Observable<AllProdutc>
  {
    return this.httpClient.get<AllProdutc>(`${baseUrl}/api/v1/products`);
  }

  getAllCategories():Observable<any>
  {
    return this.httpClient.get(`${baseUrl}/api/v1/categories`);
  }

  getSpecificProduct(id:string):Observable<{data:Produts}>
  {
    return this.httpClient.get<{data:Produts}>(`${baseUrl}/api/v1/products/${id}`);
  }
}
