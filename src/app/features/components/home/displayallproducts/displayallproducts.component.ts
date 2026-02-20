import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../../shared/services/product.service';
import { single } from 'rxjs';
import { Produts } from '../../../../shared/models/products';

@Component({
  selector: 'app-displayallproducts',
  imports: [],
  templateUrl: './displayallproducts.component.html',
  styleUrl: './displayallproducts.component.scss',
})
export class DisplayallproductsComponent implements OnInit {
  productService: ProductService = inject(ProductService);
  productList: WritableSignal<Produts[]> = signal<Produts[]>([]);

  ngOnInit(){
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((res) => {
      console.log(res.data);
      this.productList.set(res.data)
    });
  }
}
