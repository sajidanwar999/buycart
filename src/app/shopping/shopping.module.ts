import { NgModule } from '@angular/core';
import {ProductFilterComponent} from './components/products/product-filter/product-filter.component';
import {ShippingFormComponent} from './components/shipping-form/shipping-form.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ProductsComponent} from './components/products/products.component';
import {CheckOutComponent} from './components/check-out/check-out.component';
import {MyOrderComponent} from './components/my-order/my-order.component';
import {OrderSuccessComponent} from './components/order-success/order-success.component';
import {ShoppingCartSummaryComponent} from './components/shopping-cart-summary/shopping-cart-summary.component';
import {RouterModule} from '@angular/router';
import {AuthGuardService} from '../shared/services/auth-guard.service';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {path: 'products', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent},
      {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuardService]},
      {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService]},
      {path: 'my/orders', component: MyOrderComponent, canActivate: [AuthGuardService]}
    ])
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrderComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ]
})
export class ShoppingModule { }
