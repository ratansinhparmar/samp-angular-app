import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { debounceTime, filter, map, startWith, tap } from 'rxjs/operators';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddEditProductDialogComponent } from 'src/app/components/dialog/add-edit-product-dialog/add-edit-product-dialog.component';
@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    products$: Observable<Product[]>;
    searchControl = new FormControl();

    ratingFilter = [1, 2, 3, 4, 5];
    productListFormGroup: FormGroup;

    constructor(
        private productService: ProductService,
        private modalService: BsModalService
    ) {

        this.productListFormGroup = new FormGroup({
            rating: new FormArray(this.ratingFilter.map(r => new FormControl())),
            inStock: new FormControl(true),
        });

        const search$ = this.searchControl.valueChanges.pipe(
            startWith(''),
            debounceTime(300)
        );

        const rating$ = this.productListFormGroup.get('rating').valueChanges.pipe(
            startWith([]),
            map((rating: []) => rating.map((value, index) => value ? index + 1 : null).filter(d => d))
        );

        const inStock$ = this.productListFormGroup.get('inStock').valueChanges.pipe(
            startWith(true)
        );

        this.products$ = combineLatest([this.productService.products$,
            search$,
            rating$,
            inStock$
        ]).pipe(
            map(([products, search, ratings, inStock]) => {

                if (inStock !== null) {
                    products = products.filter(p => p.in_stock === inStock);
                }

                if (ratings.length) {
                    products = products.filter(p => ratings.includes(p.rating));
                }

                if (search) {
                    products = products.filter(p => p.title.toLowerCase().includes((search as string).toLowerCase()));
                }

                return products;
            })
        );

    }

    ngOnInit(): void {
        // this.productUtilService.setProdcutListInLocalStorage();
        // this.savedProducts = this.productUtilService.getProductListFromLocalStorage();
        // this.products = JSON.parse(JSON.stringify(this.savedProducts));
    }

    openAddProductModal(){
        this.modalService.show(AddEditProductDialogComponent, {class: 'modal-lg', ignoreBackdropClick: true});
    }

}
