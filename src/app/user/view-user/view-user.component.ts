import { Component, OnInit } from '@angular/core';
import { getFullName, User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-user',
    templateUrl: './view-user.component.html',
    styleUrls: ['./view-user.component.less'],
})
export class ViewUserComponent implements OnInit {
    user: User;
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const { id } = params;
        console.log(`USER ID IN DETAILS PAGE ${id}`);
      });
    }
}
