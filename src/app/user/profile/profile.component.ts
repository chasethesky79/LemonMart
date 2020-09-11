import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { IAuthStatus } from '../../models/auth.status';
import { filter } from 'rxjs/operators';
import { User } from '../../models/user';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.less'],
})
export class ProfileComponent implements OnInit {
    constructor(private userService: UserService) {}

    userForm: FormGroup;
    ngOnInit(): void {
        const userStatus: IAuthStatus = localStorage.getItem('user-status') ? JSON.parse(localStorage.getItem('user-status')) : null;
        if (userStatus) {
            const { userId } = userStatus;
            this.userService
                .getCurrentUser(userId)
                .pipe(filter((user) => !!user))
                .subscribe((user) => this.buildUserForm(user));
        }
    }

    private buildUserForm(user: User): void {}
}
