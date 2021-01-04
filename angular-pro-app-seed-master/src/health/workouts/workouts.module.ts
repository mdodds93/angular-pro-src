import {NgModule} from "@angular/core";
import {WorkoutsComponent} from "./containers/workouts/workouts.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

export const ROUTES: Routes = [
  {path: '', component: WorkoutsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    WorkoutsComponent
  ],
  providers: []
})
export class WorkoutsModule {
}
