import {NgModule} from "@angular/core";
import {MealsComponent} from "./containers/meals/meals.component";
import {MealComponent} from "./containers/meal/meal.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {MealFormComponent} from "./components/meal-form/meal-form.component";

export const ROUTES: Routes = [
  {path: '', component: MealsComponent},
  {path: 'new', component: MealComponent},
  {path: ':id', component: MealComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    MealsComponent,
    MealComponent,
    MealFormComponent
  ],
  providers: []
})
export class MealsModule {
}
