import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { HomesliderComponent } from './homeslider/homeslider.component';
import { CategorysliderComponent } from './categoryslider/categoryslider.component';
import { DisplayallproductsComponent } from './displayallproducts/displayallproducts.component';
import { ProductService } from '../../../shared/services/product.service';
import { Produts } from '../../../shared/models/products';
import { ProductcartComponent } from '../../../shared/components/productcart/productcart.component';
import { SearchproductsPipe } from '../../../shared/pipes/searchproducts/searchproducts.pipe';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { FlowbitsService } from '../../../core/services/flowbits/flowbits.service';
import { SearchproductsbypricePipe } from '../../../shared/pipes/searchproducts/searchproductsbyprice.pipe';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [HomesliderComponent,CategorysliderComponent,ProductcartComponent,SearchproductsPipe,SearchproductsbypricePipe,FormsModule,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
userSearch:string='';
selectedOption:string='';

  productService: ProductService = inject(ProductService);
  productList: WritableSignal<Produts[]> = signal<Produts[]>([]);
  constructor(private flowbiteService: FlowbitsService) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

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
