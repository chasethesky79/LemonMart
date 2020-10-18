import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerHomeComponent } from './manager-home/manager-home.component';
import { ManagerComponent } from './manager/manager.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { UserManagementComponent } from './user-management/user-management.component';
import { ReceiptLookupComponent } from './receipt-lookup/receipt-lookup.component';
import { UserTableComponent } from './user-table/user-table.component';
import { MatIconModule } from '@angular/material/icon';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [ManagerHomeComponent, ManagerComponent, UserManagementComponent, ReceiptLookupComponent, UserTableComponent],
  imports: [CommonModule, ManagerRoutingModule, MatToolbarModule, MatButtonModule, MatIconModule, ReactiveFormsModule, MatFormFieldModule,
    MatCardModule, MatInputModule],
})
export class ManagerModule {}
