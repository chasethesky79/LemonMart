import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerComponent } from './manager.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

describe('ManagerComponent', () => {
    let component: ManagerComponent;
    let fixture: ComponentFixture<ManagerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ManagerComponent],
            imports: [MatToolbarModule, RouterTestingModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
