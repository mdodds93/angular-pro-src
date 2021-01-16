import {Component, OnDestroy, OnInit} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {ScheduleItem, ScheduleService} from "../../../shared/services/schedule/schedule.service";
import {Store} from "store";
import {Workout, WorkoutsService} from "../../../shared/services/workouts/workouts.service";
import {Meal, MealsService} from "../../../shared/services/meals/meals.service";

@Component({
  selector: 'schedule',
  styleUrls: ['schedule.component.scss'],
  template: `
    <div class="schedule">
      <schedule-calendar [date]="date$ | async"
                         [items]="schedule$ | async"
                         (change)="changeDate($event)"
                         (select)="changeSection($event)"></schedule-calendar>
      <schedule-assign *ngIf="open"
                       [section]="selected$ | async"
                       [list]="list$ | async"
                       (update)="assignItem($event)"
                       (cancel)="closeAssign()">
      </schedule-assign>

    </div>
  `
})
export class ScheduleComponent implements OnInit, OnDestroy {
  open = false;
  date$: Observable<Date>;
  schedule$: Observable<ScheduleItem[]>;
  selected$: Observable<any>;
  list$: Observable<Meal[] | Workout[]>;
  subscriptions: Subscription[];

  constructor(private store: Store,
              private scheduleService: ScheduleService,
              private mealsService: MealsService,
              private workoutsService: WorkoutsService) {
  }

  ngOnInit(): void {
    this.date$ = this.store.select('date');
    this.schedule$ = this.store.select('schedule');
    this.selected$ = this.store.select('selected');
    this.list$ = this.store.select('list');
    this.subscriptions = [
      this.scheduleService.schedule$.subscribe(),
      this.scheduleService.selected$.subscribe(),
      this.mealsService.meals$.subscribe(),
      this.scheduleService.items$.subscribe(),
      this.workoutsService.workouts$.subscribe(),
      this.scheduleService.list$.subscribe()
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  changeDate(date: Date) {
    this.scheduleService.updateDate(date);
  }

  changeSection(event: any) {
    this.open = true;
    this.scheduleService.selectSection(event);
  }

  closeAssign() {
    this.open = false;
  }

  assignItem(items: string[]) {
    this.scheduleService.updateItems(items);
    this.closeAssign();
  }

}
