import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { BolaComponent } from './components/bola/bola.component';
import { facebookSdkLoader } from './helpers';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BolaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: facebookSdkLoader, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
