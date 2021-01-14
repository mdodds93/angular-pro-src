import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Store} from "store";

@Injectable()
export class ScheduleService {

  private date$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

  schedule$:Observable<any[]>=this.date$
    .do((next: any)=>this.store.set('date', next));

  constructor(private store: Store) {
  }

}
