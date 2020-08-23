import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { IAuthStatus } from '../models/auth.status';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
    displayLogin = true;
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.authStatus$.subscribe((authStatus: IAuthStatus) => (this.displayLogin = !authStatus.isAuthenticated));
    }
}
