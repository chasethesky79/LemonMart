import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from '../user/view-user/view-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from './spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    declarations: [ViewUserComponent, SpinnerComponent],
    imports: [CommonModule, MatCardModule, MatIconModule, MatProgressSpinnerModule],
  exports: [ViewUserComponent, SpinnerComponent],
})
export class SharedComponentModule {}
