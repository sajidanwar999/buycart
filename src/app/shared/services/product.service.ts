import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {
  allproductRef: AngularFireList<any>;
  allproducts$: Observable<any>;
  constructor(private db: AngularFireDatabase) { }
  createProduct(product) {
    return this.db.list('/products').push(product);
  }

  getAllProducs() {
    this.allproductRef = this.db.list('/products');
    return this.allproducts$ = this.allproductRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
  }
  editProduct (productID) {
    return this.db.object('/products/' + productID);
  }
  updateProduct (productID, product) {
    return this.db.object('/products/' + productID).update(product);
  }
  deleteProduct(productID){
    return this.db.object('/products/' + productID).remove();
  }
}
