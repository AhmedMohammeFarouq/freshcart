import { Component, inject, input } from '@angular/core';
import { Produts } from '../../models/products';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-productcart',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './productcart.component.html',
  styleUrl: './productcart.component.scss',
})
export class ProductcartComponent {
  cartService: CartService = inject(CartService);
  toastr = inject(ToastrService);
  product = input<Produts>({} as Produts);

  addToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe((res) => {
      console.log(res.message);
      this.toastr.success(res.message, '', {
        timeOut: 3000,
        progressBar: true,
      });

      this.cartService.numberOfProducts.next(res.numOfCartItems);
    });
  }
}
