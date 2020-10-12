import { Injectable } from '@angular/core';
import { ProductUtilService } from '../utils/product-util.service';
import { Product } from '../../shared/models/product.model';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class ProductService {

    private products: Product[];
    private productsSubject = new BehaviorSubject<Product[]>([]);
    refresh$ = new BehaviorSubject(undefined);
    products$ = this.productsSubject.asObservable().pipe(map(products => products.filter(p => !p.is_deleted)));
    trashProducts$ = this.productsSubject.asObservable().pipe(map(products => products.filter(p => p.is_deleted)));

    constructor(private utilService: ProductUtilService) {
        this.products = this.utilService.getProductListFromLocalStorage();
        this.setProducts(this.products);
    }

    setProducts(products: Product[]) {
        this.products = products;
        this.productsSubject.next(products);
    }

    addProduct(product: Product) {
        this.setProducts([...this.products, product]);
        this.utilService.updateProducts(this.products);
    }

    getProduct(id) {

        const data = this.products.filter(e => e.product_id === id);

        if (data.length > 0) {
            return data[0];
        } else {
            return null;
        }
    }

    updateProduct(product: Product) {
        const index = this.products.findIndex(p => p.product_id === product.product_id);

        if (index !== -1) {
            this.products[index] = product;
        }

        this.setProducts(this.products);
        this.utilService.updateProducts(this.products);
    }

    delete(product: Product) {

        const index = this.products.findIndex(p => p.product_id === product.product_id);
        if (this.products[index].is_deleted) {
            this.products.splice(index, 1);
        } else {
            this.products[index].is_deleted = true;
        }
        this.setProducts(this.products);
        this.utilService.updateProducts(this.products);
    }

}
