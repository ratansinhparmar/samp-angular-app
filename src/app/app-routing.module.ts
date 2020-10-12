import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductTrashComponent } from './pages/product-trash/product-trash.component';


const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ProductListComponent },
    { path: 'product', component: ProductDetailsComponent },
    { path: 'product/:id', component: ProductDetailsComponent },
    { path: 'product-trash', component: ProductTrashComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
