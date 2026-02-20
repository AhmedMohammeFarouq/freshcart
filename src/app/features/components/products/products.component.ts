import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../shared/services/product.service';
import { Produts } from '../../../shared/models/products';
import { ProductcartComponent } from '../../../shared/components/productcart/productcart.component';
import { SearchproductsPipe } from '../../../shared/pipes/searchproducts/searchproducts.pipe';
import { SearchproductsbypricePipe } from '../../../shared/pipes/searchproducts/searchproductsbyprice.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [FormsModule,ProductcartComponent,SearchproductsPipe,SearchproductsbypricePipe,TranslatePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  ngOnInit(): void {
    this.getAllProducts()
  }
userSearch:string='';
selectedOption:string='';

  productService: ProductService = inject(ProductService);
    productList: WritableSignal<Produts[]> = signal<Produts[]>([]);

    getAllProducts(){
    this.productService.getAllProducts().subscribe({
    next:res=>{

      this.productList.set(res.data)

    },error:err=>{
      console.log(err);
    }
    })
  }
}
