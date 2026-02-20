import { Pipe, PipeTransform } from '@angular/core';
import { Produts } from '../../models/products';

@Pipe({
  name: 'searchproducts',
})
export class SearchproductsPipe implements PipeTransform {

  transform(productList:Produts[],searchWord:string): Produts[] {
    return productList.filter((product,index)=>{
      return product.title.toUpperCase().includes(searchWord.toUpperCase());
    });
  }

}
