import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator, passwordValidator } from '../utils/validations';

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
                if (authStatus.isAuthenticated) {
                    this.router.navigate([this.redirectUrl || '/manager']);
                }
            },
            (error) => (this.loginError = error)
        );
    }
}
