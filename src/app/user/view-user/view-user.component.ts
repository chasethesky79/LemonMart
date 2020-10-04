import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { getFullName, User } from '../../models/user';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.less'],
})
export class ViewUserComponent implements OnChanges {
    @Input() userForm: FormGroup;
    user: User;
    constructor() {}

    ngOnChanges(): void {
      if (this.userForm) {
        this.user = { ...this.userForm.value, fullName: getFullName(this.userForm.value), email: this.userForm.get('email').value };
      }
    }
}
