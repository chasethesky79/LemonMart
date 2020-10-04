import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { getFullName, User } from '../../models/user';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.less'],
})
export class ViewUserComponent implements OnChanges {
    @Input() user: User;
    constructor() {}

    ngOnChanges(): void {
      if (this.user) {
        const { name: { first, last, middle } } = this.user;
        this.user = { ...this.user, fullName: getFullName(this.user) };
      }
    }
}
