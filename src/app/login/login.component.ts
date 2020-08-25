import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { emailValidator, passwordValidator } from '../utils/validations';
import {WelcomeDialogComponent} from '../welcome-dialog/welcome-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
    redirectUrl: string;
    loginError: string;
    constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute,
                private dialog: MatDialog) {
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
                if (authStatus.isAuthenticated) {
                  this.dialog.open(WelcomeDialogComponent, {
                    data: {
                      userRole
                    },
                  });
                }
            },
            (error) => (this.loginError = error)
        );
    }
}
