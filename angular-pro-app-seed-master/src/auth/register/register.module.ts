import {RegisterComponent} from "./register.component";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";

export const ROUTES: Routes = [
  {path: '', component: RegisterComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule{}
