import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Category } from '../../../shared/models/products';
import { ProductService } from '../../../shared/services/product.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  imports: [TranslatePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  private productService: ProductService = inject(ProductService);
  allCateg:WritableSignal<Category[]>= signal<Category[]>([])

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe((res) => {
      this.allCateg.set(res.data)
      console.log(res);

    });
  }
}
