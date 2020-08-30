import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IAuthStatus } from '../models/auth.status';
import { Role } from '../models/role.enum';
import { Router } from '@angular/router';
import { CacheService } from '../cache/cache.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
    displayLogin = true;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.authService.authStatus$.subscribe((savedAuthStatus: IAuthStatus) => {
            const isManager = savedAuthStatus && savedAuthStatus.isAuthenticated && savedAuthStatus.userRole === Role.Manager;
            if (isManager) {
                this.router.navigate(['/manager']);
            } else {
                this.router.navigate(['/login']);
            }
        });
    }
}
