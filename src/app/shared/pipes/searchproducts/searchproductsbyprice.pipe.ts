import { Pipe, PipeTransform } from '@angular/core';
import { Produts } from '../../models/products';

@Pipe({
  name: 'searchproductsbyprice',
})
export class SearchproductsbypricePipe implements PipeTransform {

  transform(priductList:Produts[],data:string): Produts[] {
    return priductList.filter((product,index)=>{
      return product.price.toString().startsWith(data.toString());
    });
  }

}
