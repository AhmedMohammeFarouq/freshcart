import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CartService } from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {


  cartService:CartService=inject(CartService)
  allBrands:WritableSignal<any> = signal<any>({})

  ngOnInit(): void {
   this.getAllBrands()
  }

  getAllBrands(){
    this.cartService.allBrands().subscribe({
      next:res=>{
        this.allBrands.set(res.data)
        console.log(this.allBrands());
      }
    })
  }
}
