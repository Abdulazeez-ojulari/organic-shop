import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './components/items/items.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessfulComponent } from './components/order-successful/order-successful.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ItemsFilterComponent } from './components/items/items-filter/items-filter.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';



@NgModule({
  declarations: [
    ItemsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessfulComponent,
    MyOrdersComponent,
    ItemsFilterComponent,
    ShoppingCartSummaryComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'items', component: ItemsComponent},
      { path: 'shopping-cart', component: ShoppingCartComponent},
      { 
        path: 'check-out', 
        component: CheckOutComponent, 
        canActivate: [AuthGuard]
      },
      { 
        path: 'order-successful/:id',
        component: OrderSuccessfulComponent, 
        canActivate: [AuthGuard]
      },
      
      { 
        path: 'my/orders',
        component: MyOrdersComponent, 
        canActivate: [AuthGuard]
      }
    ])
  ]
})
export class ShoppingModule { }
