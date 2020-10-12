import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
    selector: 'app-add-edit-product-dialog',
    templateUrl: './add-edit-product-dialog.component.html',
    styleUrls: ['./add-edit-product-dialog.component.scss']
})
export class AddEditProductDialogComponent implements OnInit {

    product: Product;

    categories = ['TV', 'Laptop', ' Fridge', 'Device'];
    locations = ['Ahmedabad', 'Gandhinagar', 'Rajkot', 'Nadiyad'];

    productFormGroup: FormGroup;
    isInvalid = (formControl: string) => this.productFormGroup.get(formControl)?.invalid && this.productFormGroup.get(formControl)?.touched;

    constructor(
        public bsModalRef: BsModalRef,
        private toastr: ToastrService,
        private productService: ProductService) {
    }

    ngOnInit(): void {

        this.productFormGroup = new FormGroup({
            title: new FormControl(this.product?.title || '', [Validators.required, Validators.maxLength(50)]),
            desc: new FormControl(this.product?.desc || '', [Validators.required, Validators.maxLength(150)]),
            image_url: new FormControl(this.product?.image_url || '', [Validators.required]),
            price: new FormControl(this.product?.price || undefined, [Validators.required]),
            rating: new FormControl(this.product?.rating || undefined, [Validators.required]),
            location_available: new FormControl(this.product?.location_available || undefined, [Validators.required]),
            category: new FormControl(this.product?.category || undefined, [Validators.required]),
            in_stock: new FormControl(this.product?.in_stock !== null ? this.product?.in_stock : true),
        });

    }

    save() {
        if (this.productFormGroup.invalid) {
            this.productFormGroup.markAllAsTouched();
            return;
        }
        if (this.product && this.product?.product_id) {
            this.productService.updateProduct({ ...this.productFormGroup.value, product_id: this.product.product_id });
            this.toastr.success(`${this.productFormGroup.value.title} updated...`);
            this.productService.refresh$.next(true);
        } else {
            this.productService.addProduct({ ...this.productFormGroup.value, product_id: new Date().getTime() });
            this.toastr.success(`${this.productFormGroup.value.title} saved...`);
        }
        this.bsModalRef.hide();
    }

}
