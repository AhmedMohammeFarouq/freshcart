import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Produts } from '../../../shared/models/products';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../shared/services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-productdetails',
  imports: [TranslatePipe],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.scss',
})
export class ProductdetailsComponent implements OnInit {
  dis:number=.3;
  toastr = inject(ToastrService);
  product: WritableSignal<Produts> = signal<Produts>({} as Produts);
  productService: ProductService = inject(ProductService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  cartService: CartService = inject(CartService);
  ngOnInit() {
    this.activatedRoute.params.subscribe((data) => {
      console.log(data['id']);
      this.getProductDetalis(data['id']);
    });
  }

  getProductDetalis(id: string) {
    this.productService.getSpecificProduct(id).subscribe((res) => {
      this.product.set(res.data);
      console.log(this.product());
    });
  }

  get ratingPercentage(): string {
    return `${(this.product()?.ratingsAverage / 5) * 100}%`;
  }
  // selected main image
  mainImage = signal<string | null>(null);

  // computed main image
  currentMainImage = computed(() => {
    const p = this.product();
    return this.mainImage() ?? p?.imageCover;
  });

  // change main image
  changeMainImage(img: string) {
    this.mainImage.set(img);
  }

  addToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe((res) => {
      this.toastr.success(res.message, '', {
        timeOut: 3000,
        progressBar: true,
      });

       this.cartService.numberOfProducts.next(res.numOfCartItems);
    });
  }

}
