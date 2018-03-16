import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../shared/services/category.service';
import {ProductService} from '../../../shared/services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = {};
  id;
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router) {
    this.categories$ = categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.editProduct(this.id).valueChanges().take(1).subscribe(p => {
        this.product = p;
      });
    }
  }
  save (product) {
    if (this.id) {
      this.productService.updateProduct(this.id, product);
    } else {
      this.productService.createProduct(product);
    }
    this.router.navigate(['/admin/products']);
  }
  delete() {
    if (confirm('Are you sure you want to delete this product')) {
        this.productService.deleteProduct(this.id);
        this.router.navigate(['/admin/products']);
    }
  }
  ngOnInit() {
  }

}
