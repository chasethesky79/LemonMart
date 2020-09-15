import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IAuthStatus } from '../../models/auth.status';
import {filter, map} from 'rxjs/operators';
import { User } from '../../models/user';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Role } from '../../models/role.enum';
import {
  birthDateValidator,
  emailValidator,
  oneCharValidator,
  optionalTextValidator,
  requiredTextValidator,
  usaPhoneNumberValidator,
  usaZipCodeValidator, usStateFilter,
} from '../../utils/validations';
import {USState, usStates} from '../../models/user-data';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
    constructor(private userService: UserService, private formBuilder: FormBuilder) {}

    userForm: FormGroup;
    isUserAManager: boolean;
    states: USState[] = usStates;
    ngOnInit(): void {
        const userStatus: IAuthStatus = localStorage.getItem('user-status') ? JSON.parse(localStorage.getItem('user-status')) : null;
        if (userStatus) {
            const { userId, userRole } = userStatus;
            const user = {
                id: '123',
                email: 'seshadri.bharath@yahoo.com',
                name: {
                    first: 'Bharath',
                    middle: 'M',
                    last: 'Seshadri',
                },
                role: userRole,
                dateOfBirth: new Date(),
                address: {
                    line1: 'No 3 Shanumugam Street',
                    line2: 'Royapettah',
                    city: 'Chennai',
                    state: '',
                    zip: '600014',
                },
            } as any;
            this.isUserAManager = userRole === Role.Manager;
            // Replacing the return value of userService.getCurrentUser with a static user for now
            // this.userService
            //     .getCurrentUser(userId)
            //     .pipe(filter((user) => !!user))
            //     .subscribe((user) => this.buildUserForm(user, userRole));
            this.buildUserForm(user);
            this.userForm.get('address')?.get('state')?.valueChanges
              .pipe(
                filter(value => !!value),
                map(value => usStateFilter(value))
              ).subscribe((filteredStates: USState[]) => this.states = filteredStates);
        }
    }

    get rolesArray(): FormArray {
        return this.userForm && (this.userForm.get('roles') as FormArray);
    }

    private buildUserForm(user: User): void {
        const {
            email,
            name: { first, middle, last },
            dateOfBirth,
            role,
            address: { line1, line2, city, state, zip },
        } = user;
        this.userForm = this.formBuilder.group({
            email: [{ value: email || '', disabled: role !== Role.Manager }, emailValidator],
            name: this.formBuilder.group({
                first: [first || '', requiredTextValidator],
                middle: [middle || '', oneCharValidator],
                last: [last || '', requiredTextValidator],
            }),
            roles: this.formBuilder.array(
                Object.keys(Role).map((entry) => this.formBuilder.group({ role: entry, checked: role === entry.toLowerCase() }))
            ),
            dateOfBirth: [dateOfBirth || '', birthDateValidator],
            address: this.formBuilder.group({
                line1: [line1 || '', requiredTextValidator],
                line2: [line2 || '', optionalTextValidator],
                city: [city || '', requiredTextValidator],
                state: [state || '', requiredTextValidator],
                zip: [zip || '', usaZipCodeValidator],
            }),
        });
    }
}
