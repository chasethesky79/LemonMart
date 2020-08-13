import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'manager', loadChildren: './manager/manager.module#ManagerModule' },
    { path: 'pos', loadChildren: './pos/pos.module#PosModule' },
    { path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule' },
    { path: 'user', loadChildren: './user/user.module#UserModule' },
    { path: '**', component: PagenotfoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
