import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { ManagerModule } from './manager/manager.module';
import { InventoryModule } from './inventory/inventory.module';
import { PosModule } from './pos/pos.module';
import { UserModule } from './user/user.module';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from './auth/auth.service';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
    declarations: [AppComponent, HomeComponent, PagenotfoundComponent, LoginComponent, WelcomeDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ManagerModule,
    InventoryModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    PosModule,
    UserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
  ],
    providers: [AuthService],
    bootstrap: [AppComponent],
  entryComponents: [WelcomeDialogComponent]
})
export class AppModule {}
