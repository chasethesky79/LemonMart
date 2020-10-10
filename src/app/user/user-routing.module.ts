import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from '../auth/auth-guard.service';
import { ViewUserComponent } from './view-user/view-user.component';
import { UserResolve } from './user.resolve';

const routes: Routes = [
    { path: 'logout', component: LogoutComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], resolve: { user: UserResolve } },
    { path: 'view', component: ViewUserComponent, resolve: { user: UserResolve } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
