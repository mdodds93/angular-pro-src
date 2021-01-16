import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Store} from "store";
import {Meal} from "../meals/meals.service";
import {Workout} from "../workouts/workouts.service";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/withLatestFrom";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";

export interface ScheduleItem {
  meals: Meal[],
  workouts: Workout[],
  section: string,
  timestamp: number,
  $key?: string
}

export interface ScheduleList {
  morning?: ScheduleItem,
  lunch?: ScheduleItem,
  evening?: ScheduleItem,
  snacks?: ScheduleItem,

  [key: string]: any
}

@Injectable()
export class ScheduleService {

  private date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  public schedule$: Observable<ScheduleList> = this.date$
    .do((next: any) => this.store.set('date', next))
    .map((day: any) => {
      const startAt = new Date(day.getFullYear(), day.getMonth(), day.getDate()).getTime();
      const endAt = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1).getTime() - 1;
      return {startAt, endAt};
    })
    .switchMap(({startAt, endAt}: any) => this.getSchedule(startAt, endAt))
    .map((data: any) => {
      const mapped: ScheduleList = {};
      for (const prop of data) {
        if (!mapped[prop.section]) {
          mapped[prop.section] = prop;
        }
      }
      return mapped;
    })
    .do((next: ScheduleList) => this.store.set('schedule', next));
  private section$: Subject<any> = new Subject<any>();
  public selected$ = this.section$
    .do((next: any) => this.store.set('selected', next));
  public list$ = this.section$
    .map((value: any) => this.store.value[value.type])
    .do((next: any) => this.store.set('list', next));
  private itemsList$: Subject<any> = new Subject<any>();
  items$ = this.itemsList$.withLatestFrom(this.section$)
    .map(([items, section]: any[]) => {
      const id = section.data.$key;
      const defaults: ScheduleItem = {
        workouts: null,
        meals: null,
        section: section.section,
        timestamp: new Date(section.day).getTime()
      };

      const payload = {
        ...(id ? section.data : defaults),
        ...items
      }
      if (id) {
        return this.updateSection(id, payload);
      } else {
        return this.createSection(payload)
      }
    });

  constructor(private store: Store,
              private db: AngularFireDatabase,
              private authService: AuthService) {
  }

  get uid(): string {
    return this.authService.user.uid;
  }

  updateDate(date: Date) {
    this.date$.next(date);
  }

  selectSection(event: any) {
    this.section$.next(event);
  }

  updateItems(items: string[]) {
    this.itemsList$.next(items);
  }

  private updateSection(key: string, payload: ScheduleItem) {
    return this.db.object(`schedule/${this.uid}/${key}`).update(payload);

  }

  private createSection(payload: ScheduleItem) {
    return this.db.list(`schedule/${this.uid}`).push(payload);
  }

  private getSchedule(startAt: number, endAt: number) {
    return this.db.list(`schedule/${this.uid}`, {
      query: {
        orderByChild: 'timestamp',
        startAt,
        endAt
      }
    });
  }

}
