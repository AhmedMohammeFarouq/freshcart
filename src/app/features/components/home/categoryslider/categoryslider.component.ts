import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductService } from '../../../../shared/services/product.service';
import { AllProdutc, Category, Produts } from '../../../../shared/models/products';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-categoryslider',
  imports: [CarouselModule,TranslatePipe],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss',
})
export class CategorysliderComponent implements OnInit {
  private productService: ProductService = inject(ProductService);
  allCateg:WritableSignal<Category[]>= signal<Category[]>([])
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:3500,
    autoplayHoverPause:true,
    dots: true,
    rtl:true,
    navSpeed: 800,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400:{
        items:2
      },
      900:{
        items:4
      },
      1100:{
        items:5
      },
      1200:{
        items:7
      }
    },
    nav: false,
  };
  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.productService.getAllCategories().subscribe((res) => {
      this.allCateg.set(res.data)
    });
  }
}
