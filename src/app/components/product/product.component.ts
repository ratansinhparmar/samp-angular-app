import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/shared/models/product.model';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

    @Input() product: Product;
    @Input() trashView: boolean;
    modalRef: BsModalRef;
    constructor(
        private productService: ProductService,
        private modalService: BsModalService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
    }
    restore(product) {
        this.product.is_deleted = false;
        this.productService.updateProduct(product);
        this.toastr.success(`${product.title} restored...`);
    }

    remove(product) {
        this.productService.delete(product);
        this.toastr.success(`${product.title} removed...`);
    }

    // This method open the delete product
    openModal(template: TemplateRef<any>, obj) {
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
        this.modalRef.content = obj;
    }

    confirm(obj) {
        this.modalRef.hide();
        this.remove(obj);
    }
}
