import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { BolaComponent } from './components/bola/bola.component';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './view/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Essa função é chamada antes de iniciar o projeto para poder carregar o FB SDK.
export function preload(authService:AuthService){
  return () => authService.loadFbSDK(authService);
}

@NgModule({
  providers: [
    {provide: APP_INITIALIZER, useFactory: preload, multi: true, deps:[AuthService]},
    AuthService,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    BolaComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
