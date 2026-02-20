import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { OrderService } from '../../services/order/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { CartData } from '../../../shared/models/icart';

@Component({
  selector: 'app-shippingaddress',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './shippingaddress.component.html',
  styleUrl: './shippingaddress.component.scss',
})
export class ShippingaddressComponent implements OnInit {
  ngOnInit(): void {
    this.cartService.getLogedUserCart().subscribe((res) => {
      this.cartProducts.set(res.data);
      console.log(this.cartProducts());
    });
  }

  sumOrder: WritableSignal<boolean> = signal<boolean>(true);
  isLoding: WritableSignal<boolean> = signal<boolean>(false);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);
  orderService: OrderService = inject(OrderService);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  cartService: CartService = inject(CartService);
  cartProducts: WritableSignal<CartData> = signal<CartData>({} as CartData);
  shippingAddressForm: FormGroup = this.fb.group({
    details: [null, Validators.required],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city: [null, Validators.required],
  });

  submitShippingAddressForm() {
    if (this.shippingAddressForm.valid) {
      this.isLoding.set(true);

      this.activatedRoute.params.subscribe({
        next: (res) => {
          console.log(res['id']);

          this.orderService.shippingAddress(res['id']!, this.shippingAddressForm.value).subscribe({
            next: (res) => {
              this.isLoding.set(false);
              this.cartService.numberOfProducts.next(0);
              this.sumOrder.set(false);
              console.log(res);
            },
            error: (err) => {
              console.log(err);
              this.isLoding.set(false);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  submitShippingAddressFormOnline() {
    if (this.shippingAddressForm.valid) {
      this.isLoding.set(true);

      this.activatedRoute.params.subscribe({
        next: (res) => {
          console.log(res['id']);

          this.orderService
            .shippingAddressOnline(res['id']!, this.shippingAddressForm.value)
            .subscribe({
              next: (res) => {
                this.isLoding.set(false);
                window.open(res.session.url, '_self');
                console.log(res);
              },
              error: (err) => {
                console.log(err);
                this.isLoding.set(false);
              },
            });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  goToAllOrders() {
    this.router.navigate(['allorders']);
  }
}
