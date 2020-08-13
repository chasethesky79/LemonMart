import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { StockEntryComponent } from './stock-entry/stock-entry.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    declarations: [InventoryComponent, StockEntryComponent, ProductsComponent, DashboardComponent],
    imports: [CommonModule, InventoryRoutingModule],
})
export class InventoryModule {}
