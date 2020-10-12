import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { combineLatest } from 'rxjs';
import { AddEditProductDialogComponent } from 'src/app/components/dialog/add-edit-product-dialog/add-edit-product-dialog.component';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
    mode: string;
    product: Product;
    productForm: FormGroup;
    modalRef: BsModalRef;

    constructor(
        private activatedRoute: ActivatedRoute,
        private modalService: BsModalService,
        private productService: ProductService,
        private toastr: ToastrService) { }

    ngOnInit(): void {

        combineLatest([this.activatedRoute.paramMap, this.productService.refresh$]).subscribe(([params, refresh]) => {
            const id = params.get('id');
            this.product = this.productService.getProduct(+id);
        });
    }

    openAddProductModal() {
        this.modalService.show(AddEditProductDialogComponent,
            {
                class: 'modal-lg',
                ignoreBackdropClick: true,
                initialState: {
                    product: this.product
                }
            });
    }

    // This method open the delete product
    openModal(template: TemplateRef<any>, obj) {
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
        this.modalRef.content = obj;
    }

    confirm(obj) {
        this.modalRef.hide();
        this.softDelete(obj);
    }

    softDelete(product) {
        this.product.is_deleted = true;
        this.productService.updateProduct(product);
        this.toastr.success(`${product.title} removed...`);
    }
}


