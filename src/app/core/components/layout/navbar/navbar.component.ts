import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FlowbitsService } from '../../../services/flowbits/flowbits.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../../shared/services/cart/cart.service';
import { TranslatePipe } from '@ngx-translate/core';
import { MyTranslateService } from '../../../services/myTranslate/my-translate.service';
import { CheckPlateformService } from '../../../../shared/services/check-plateform/check-plateform.service';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  lang: WritableSignal<string> = signal<string>('');
  isLogin: boolean = false;
  userName!: string;
  cartItem: WritableSignal<number> = signal<number>(0);
  checkPlateformService: CheckPlateformService = inject(CheckPlateformService);
  myTranslateService: MyTranslateService = inject(MyTranslateService);

  constructor(
    private flowbiteService: FlowbitsService,
    public authService: AuthService,
    public cartService: CartService,
  ) {}
  ngOnInit(): void {
    this.cartService.numberOfProducts.subscribe({
      next: (res) => {
        this.cartItem.set(res);
        console.log(this.cartItem);
      },
    });

    this.authService.userData.subscribe((data) => {
      if (data != null) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
      this.getName();
    });

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    if (this.checkPlateformService.checkIsPlateformBrowser()) {
      this.lang.set(localStorage.getItem('lang') || '');
    }
  }
  // navbar md
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getName() {
    this.userName = this.authService.userData.getValue().name.split(' ').slice(0, 2).join(' ');
  }
}
