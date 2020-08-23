import {Component, OnInit} from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {AuthService} from './auth/auth.service';
import {IAuthStatus} from './models/auth.status';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
    displayAccountButtons = false;
    constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private authService: AuthService) {
        iconRegistry.addSvgIcon('lemon', sanitizer.bypassSecurityTrustResourceUrl('assets/img/lemon.svg'));
    }

    ngOnInit(): void {
      this.authService.authStatus$.subscribe((authStatus: IAuthStatus) => this.displayAccountButtons = authStatus.isAuthenticated);
    }
}
