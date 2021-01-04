import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {AngularFireModule, FirebaseAppConfig} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {SharedModule} from "./shared/shared.module";

export const ROUTES: Routes = [
  {
    path: 'auth',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'login', loadChildren: './login/login.module#LoginModule'},
      {path: 'register', loadChildren: './register/register.module#RegisterModule'},
    ]
  }];

export const firebaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyC9zjid4oFEQ0sTfN0NfbzTqvZOHQAwT5k",
  authDomain: "angular-pro-fitness-app-6c425.firebaseapp.com",
  databaseURL: "https://angular-pro-fitness-app-6c425.firebaseio.com",
  projectId: "angular-pro-fitness-app-6c425",
  storageBucket: "angular-pro-fitness-app-6c425.appspot.com",
  messagingSenderId: "465190215690"
};

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    SharedModule.forRoot()
  ]
})
export class AuthModule {
}
