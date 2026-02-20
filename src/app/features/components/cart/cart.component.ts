import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartData } from '../../../shared/models/icart';
import { TranslatePipe } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { ShippingaddressComponent } from '../shippingaddress/shippingaddress.component';

@Component({
  selector: 'app-cart',
  imports: [TranslatePipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {



  cartProducts: WritableSignal<CartData> = signal<CartData>({} as CartData);
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
    this.addCartProducts();
  }

  addCartProducts() {
    this.cartService.getLogedUserCart().subscribe((res) => {
      this.cartProducts.set(res.data);
      this.cartService.numberOfProducts.next(res.numOfCartItems);

      console.log(this.cartProducts());
    });
  }

  updataCount(productId: string, count: number) {
    if (count > -1) {
      this.cartService.updataProductCount(productId, count.toString()).subscribe({
        next: (res) => {
          this.cartProducts.set(res.data);
          this.cartService.numberOfProducts.next(res.numOfCartItems);

          // console.log(res);
        },
      });
    }
  }

  removeProduct(productId: string) {
    this.cartService.removeProduct(productId).subscribe({
      next: (res) => {
        this.cartProducts.set(res.data);
        this.cartService.numberOfProducts.next(res.numOfCartItems);
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }





}
