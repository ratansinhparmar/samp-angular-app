import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductTrashComponent } from './pages/product-trash/product-trash.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditProductDialogComponent } from './components/dialog/add-edit-product-dialog/add-edit-product-dialog.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { ToastrModule } from 'ngx-toastr';
const NGX_BOOTSTRAP_MODULES = [
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RatingModule.forRoot()
]

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ProductListComponent,
        ProductComponent,
        ProductDetailsComponent,
        ProductTrashComponent,
        AddEditProductDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        ...NGX_BOOTSTRAP_MODULES,
        ToastrModule.forRoot() 
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
