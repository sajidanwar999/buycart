import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Order} from '../../../shared/models/order';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../../../shared/services/order.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../shared/services/auth.service';
import {ShoppingCart} from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {
    name: '',
    addressline1: '',
    addressline2: '',
    city: ''
  };
  userId: string;
  userSubscription: Subscription;
  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => {
      this.userId = user.uid;
    });
  }
  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
