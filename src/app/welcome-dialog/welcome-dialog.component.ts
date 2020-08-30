import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
    selector: 'app-welcome-dialog',
    templateUrl: './welcome-dialog.component.html',
    styleUrls: ['./welcome-dialog.component.less'],
})
export class WelcomeDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data, private router: Router) {}

    ngOnInit(): void {}

    redirectToManager(): void {
        this.router.navigate(['/manager']);
    }
}
