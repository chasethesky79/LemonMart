import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private snackbar: MatSnackBar) {}

    openSuccessSnack(name: string) {
        this.snackbar.openFromComponent(SnackbarComponent, {
            data: { message: 'vc-is-multiplication-params-ui.save.success.msg', name },
            duration: 5000,
            panelClass: ['success'],
        });
    }

    openErrorSnack(msg: string, isClosable: boolean = true): void {
        this.snackbar.openFromComponent(SnackbarComponent, {
            data: { message: msg, isClosable },
            panelClass: ['error'],
        });
    }
}
