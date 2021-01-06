import {Injectable} from "@angular/core";
import {Store} from "store";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "../../../../auth/shared/services/auth/auth.service";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';

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

  addMeal(meal: Meal) {
    return this.db.list(`meals/${this.uid}`).push(meal);
  }

  removeMeal(key: string) {
    return this.db.list(`meals/${this.uid}`).remove(key);
  }
}
