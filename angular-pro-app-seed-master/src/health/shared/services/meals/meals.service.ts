import {Injectable} from "@angular/core";
import {Store} from "store";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

export interface Meal {
  name: string,
  ingredients: string[],
  timestamp: number,
  $key: string,
  $exists: () => boolean
}

@Injectable()
export class MealsService {

  meals$: Observable<any> = this.db.list(`meals/${this.uid}`)
    .do((next: any) => this.store.set('meals', next));

  constructor(private store: Store,
              private db: AngularFireDatabase,
              private authService: AuthService) {
  }

  get uid(): string {
    return this.authService.user.uid;
  }

  public getMeal(key: string) {
    if (!key) {
      return Observable.of({});
    }
    return this.store.select<Meal[]>('meals')
      .filter(Boolean)
      .map(meals => meals.find((meal: Meal) => meal.$key === key));
  }

  public addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  public updateMeal(key: string, meal: Meal) {
    return this.db.object(`meals/${this.uid}/${key}`).update(meal);
  }


  public removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
