import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator, passwordValidator } from '../utils/validations';
import { MatDialog } from '@angular/material/dialog';
import { Role } from '../models/role.enum';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
    redirectUrl: string;
    loginError: string;
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
        route.paramMap.subscribe((params) => (this.redirectUrl = params.get('redirectUrl')));
    }
    loginForm: FormGroup;

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', emailValidator],
            password: ['', passwordValidator],
        });
    }

    login(): void {
        const {
            value: { email, password },
        } = this.loginForm;
        this.authService.login(email, password).subscribe(
            (authStatus) => {
                const { userRole } = authStatus;
                this.router.navigate([this.fetchLandingPage(userRole)]);
            },
            (error) => (this.loginError = error)
        );
    }

    private fetchLandingPage(userRole: string): string {
        switch (userRole) {
            case Role.Cashier:
                return '/pos';
            case Role.Clerk:
                return '/inventory';
            case Role.Manager:
                return '/manager';
            default:
                return '/user/profile';
        }
    }
}
