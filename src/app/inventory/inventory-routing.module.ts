import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
    {
        path: '',
        component: InventoryComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'stockEntry', component: StockEntryComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'categories', component: CategoriesComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InventoryRoutingModule {}
