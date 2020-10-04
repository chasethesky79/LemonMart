import { Component, Input, OnInit } from '@angular/core';
import { getFullName, User } from '../../models/user';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.less'],
})
export class ViewUserComponent implements OnInit {
    @Input() user: User;
    constructor() {}

    ngOnInit(): void {}
}
