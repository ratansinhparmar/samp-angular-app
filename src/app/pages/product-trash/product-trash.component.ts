import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { debounceTime, startWith, tap, map } from 'rxjs/operators';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
    selector: 'app-product-trash',
    templateUrl: './product-trash.component.html',
    styleUrls: ['./product-trash.component.scss']
})
export class ProductTrashComponent implements OnInit {
    searchControl = new FormControl();

    products$: Observable<Product[]>;
    constructor(
        private productService: ProductService
    ) {
        const search$ = this.searchControl.valueChanges.pipe(
            startWith(''),
            debounceTime(300)
        );

        this.products$ = combineLatest([this.productService.trashProducts$,
            search$
        ]).pipe(
            tap(data => console.log(data)),
            map(([products, search]) => {
                if (search) {
                    products = products.filter(p => p.title.toLowerCase().includes((search as string).toLowerCase()));
                }
                return products;
            })
        );
    }

    ngOnInit(): void {
    }

}
