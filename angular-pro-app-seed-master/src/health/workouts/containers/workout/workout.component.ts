import {Component, OnDestroy, OnInit} from "@angular/core";
import {Workout, WorkoutsService} from "../../../shared/services/workouts/workouts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'workout',
  styleUrls: ['workout.component.scss'],
  template: `
    <div class="workout">
      <div class="workout__title">
        <h1>
          <img src="/img/workout.svg"/>
          <span *ngIf="workout$| async as workout; else title">{{workout.name ? 'Edit' : 'Create'}} workout</span>
          <ng-template #title>
            Loading...
          </ng-template>
        </h1>
      </div>
      <div *ngIf="workout$ | async as workout; else loading;">
        <workout-form
          [workout]="workout"
          (create)="addWorkout($event)"
          (update)="updateWorkout($event)"
          (remove)="removeWorkout()">
        </workout-form>
      </div>
      <ng-template #loading>
        <div class="message">
          <img src="/img/loading.svg"/>
          Fetching workout...
        </div>
      </ng-template>
    </div>

  `
})
export class WorkoutComponent implements OnInit, OnDestroy {

  workout$: Observable<Workout>;
  subscription: Subscription;

  constructor(private workoutsService: WorkoutsService,
              private router: Router,
              private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.subscription = this.workoutsService.workouts$.subscribe();
    this.workout$ = this.route.params
      .switchMap(param => this.workoutsService.getWorkout(param.id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public async addWorkout(event: Workout) {
    await this.workoutsService.addWorkout(event);
    this.backToWorkouts();
  }

  public async updateWorkout(event: Workout) {
    const key: string = this.route.snapshot.params.id;
    await this.workoutsService.updateWorkout(key, event);
    this.backToWorkouts();
  }

  public async removeWorkout() {
    const key: string = this.route.snapshot.params.id;
    await this.workoutsService.removeWorkout(key);
    this.backToWorkouts();
  }

  public backToWorkouts() {
    this.router.navigate(['workouts']);
  }


}
