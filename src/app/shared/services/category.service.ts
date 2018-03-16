import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoryService {
  categoryRef: AngularFireList<any>;
  categories$: Observable <any[]>;
  constructor(private db: AngularFireDatabase) { }
  getCategories () {
    this.categoryRef = this.db.list('/categories');
    return this.categories$ = this.categoryRef.snapshotChanges()
      .map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }));
      });
  }

}
