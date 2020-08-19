import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  redirectUrl: string;
  loginError: string;
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    route.paramMap.subscribe(params => this.redirectUrl = params.get('redirectUrl'));
  }
  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]]
    });
  }

  login(): void {
    const { value: { email, password } } = this.loginForm;
    this.authService.login(email, password).subscribe(authStatus => {
      if (authStatus.isAuthenticated) {
        this.router.navigate([this.redirectUrl || '/manager']);
      }
    }, error => this.loginError = error);
  }
}
