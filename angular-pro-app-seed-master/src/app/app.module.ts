import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {Store} from 'store';

// feature modules
import {AuthModule} from "../auth/auth.module";

// containers
import {AppComponent} from './containers/app/app.component';

// components

// routes
export const ROUTES: Routes = [];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    AuthModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Store
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}

/*
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyC9zjid4oFEQ0sTfN0NfbzTqvZOHQAwT5k",
    authDomain: "angular-pro-fitness-app-6c425.firebaseapp.com",
    databaseURL: "https://angular-pro-fitness-app-6c425.firebaseio.com",
    projectId: "angular-pro-fitness-app-6c425",
    storageBucket: "angular-pro-fitness-app-6c425.appspot.com",
    messagingSenderId: "465190215690",
    appId: "1:465190215690:web:9e01ba03966c09d450fff3",
    measurementId: "G-NR0H9FXQ0K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
 */
