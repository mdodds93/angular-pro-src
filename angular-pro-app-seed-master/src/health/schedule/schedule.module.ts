import {NgModule} from "@angular/core";
import {ScheduleComponent} from "./containers/schedule/schedule.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {ScheduleCalendarComponent} from "./components/schedule-calendar/schedule-calendar.component";
import {ScheduleControlsComponent} from "./components/schedule-controls/schedule-controls.component";
import {ScheduleDaysComponent} from "./components/schedule-days/schedule-days.component";
import {ScheduleAssignComponent} from "./components/schedule-assign/schedule-assign.component";
import {ScheduleSectionComponent} from "./components/schedule-section/schedule-section.component";
import {SharedModule} from "../shared/shared.module";

export const ROUTES: Routes = [
  {path: '', component: ScheduleComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    ScheduleComponent,
    ScheduleCalendarComponent,
    ScheduleControlsComponent,
    ScheduleDaysComponent,
    ScheduleSectionComponent,
    ScheduleAssignComponent
  ],
  providers: []
})
export class ScheduleModule {
}
