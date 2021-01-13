import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {WorkoutsComponent} from "./containers/workouts/workouts.component";
import {WorkoutComponent} from "./containers/workout/workout.component";
import {WorkoutFormComponent} from "./components/workout-form/workout-form.component";
import {SharedModule} from "../shared/shared.module";
import {WorkoutTypeComponent} from "./components/workout-type/workout-type.component";

export const ROUTES: Routes = [
  {path: '', component: WorkoutsComponent},
  {path: 'new', component: WorkoutComponent},
  {path: ':id', component: WorkoutComponent}
];


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    WorkoutComponent,
    WorkoutsComponent,
    WorkoutFormComponent,
    WorkoutTypeComponent
  ],
  providers: []
})
export class WorkoutsModule {
}
