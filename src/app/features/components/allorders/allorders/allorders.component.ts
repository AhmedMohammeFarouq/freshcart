import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { OrderService } from '../../../services/order/order.service';
import { Root } from '../../../../shared/models/iallorder';
import { DatePipe } from '@angular/common';
import { FlowbitsService } from '../../../../core/services/flowbits/flowbits.service';
import { initFlowbite } from 'flowbite';
import { RouterLink } from '@angular/router';
import { OrderDetalComponent } from '../../../../shared/components/orderDetal/order-detal/order-detal.component';

@Component({
  selector: 'app-allorders',
  imports: [TranslatePipe,DatePipe,RouterLink,OrderDetalComponent],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent implements OnInit {
  open:WritableSignal<boolean> = signal<boolean>(false)

    constructor(private flowbiteService: FlowbitsService) {}


  ngOnInit(): void {
    this.getAllOrders();
  this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

  }
allOrder:WritableSignal<Root>=signal<Root>([])
  authService:AuthService=inject(AuthService)

  orderService:OrderService=inject(OrderService)


  getAllOrders(){
    this.orderService.getAllOrders(this.authService.userData.getValue().id).subscribe({
      next:res=>{
        this.allOrder.set(res)
        console.log(res);

      }
    })
  }

selectedOrderId: number | null = null;

toggleOrder(id: number) {
  this.selectedOrderId =
    this.selectedOrderId === id ? null : id;
}

}
