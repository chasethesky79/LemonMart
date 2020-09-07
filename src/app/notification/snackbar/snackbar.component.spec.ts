import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnackbarComponent } from './snackbar.component';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

describe('SnackBarComponent', () => {
    let component: SnackbarComponent;
    let fixture: ComponentFixture<SnackbarComponent>;
    let matSnackBar: jasmine.SpyObj<MatSnackBar>;

    beforeEach(() => {
        const matSnackBarStub = jasmine.createSpyObj('MatSnackBar', ['dismiss']);
        TestBed.configureTestingModule({
            declarations: [SnackbarComponent],
            providers: [
                { provide: MAT_SNACK_BAR_DATA, useValue: {} },
                { provide: MatSnackBar, useValue: matSnackBarStub },
            ],
        }).compileComponents();
        fixture = TestBed.createComponent(SnackbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        matSnackBar = TestBed.get(MatSnackBar);
    });

    it('should create', () => {
        expect(component).toBeDefined();
    });

    describe('closeSnack', () => {
        it('should invoke dismiss', () => {
            component.closeSnack();
            expect(matSnackBar.dismiss).toHaveBeenCalledWith();
        });
    });
});
