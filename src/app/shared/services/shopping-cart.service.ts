import { Injectable } from '@angular/core';
import {Product} from '../models/product';
import {AngularFireDatabase} from 'angularfire2/database';
import {ShoppingCart} from '../models/shopping-cart';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
      return this.db.object('/shopping-cart/' + cartId).valueChanges()
        .map(item => new ShoppingCart(item['items']));
  }
  async addToCart (product: Product) {
    this.updateItem(product, 1);
  }
  async removeFromCart (product: Product) {
    this.updateItem(product, -1);
  }
  private createCart() {
    return this.db.list('/shopping-cart').push({
      dateCreate: new Date().getTime()
    });
  }
  async clearCart () {
    const cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-cart/' + cartId + '/items').remove();
  }
  private async getOrCreateCartId (){
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.createCart();
      localStorage.setItem('cartId', result.key);
      return result.key;
    } else {
      return cartId;
    }
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }
  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.key);
    item$.valueChanges().take(1).subscribe(item => {
      if (item != null) {
        const quantity = (item['quantity'] || 0) + change;
        if (quantity === 0) {
          item$.remove();
        } else {
          item$.update({
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: (item['quantity'] || 0) + change
          });
        }
      } else {
        item$.set({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: 1
        });
      }
    });
  }

}
