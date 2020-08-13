import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CategoriesComponent } from './categories/categories.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [InventoryComponent, StockEntryComponent, ProductsComponent, DashboardComponent, CategoriesComponent],
    imports: [CommonModule, InventoryRoutingModule, MatButtonModule, MatToolbarModule],
})
export class InventoryModule {}
