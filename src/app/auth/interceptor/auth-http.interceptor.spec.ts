import { TestBed } from '@angular/core/testing';
import { AuthHttpInterceptor } from './auth-http.interceptor';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthHttpInterceptor', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [AuthHttpInterceptor],
            imports: [RouterTestingModule],
        })
    );

    it('should be created', () => {
        const interceptor: AuthHttpInterceptor = TestBed.inject(AuthHttpInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
