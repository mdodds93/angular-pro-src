import {ChangeDetectionStrategy, Component, EventEmitter, Output} from "@angular/core";
import {Meal} from "../../../shared/services/meals/meals.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'meal-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['meal-form.component.scss'],
  template: `
    <div class="meal-form">

      <form [formGroup]="form">

        <div class="meal-form__name">
          <label>
            <h3>Meal name</h3>
            <input type="text"
                   placeholder="e.g. Ulster Fry"
                   formControlName="name">
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
        </div>
        <div class="meal-form__food">
          <div class="meal-form__subtitle">
            <h3>Food</h3>
            <button type="button"
                    class="meal-form__add"
                    (click)="addIngredient()">
              <img src="img/add-white.svg"/>
              Add Food
            </button>
          </div>
          <div formArrayName="ingredients">
            <label *ngFor="let c of ingredients.controls;  index as i;">
              <input [formControlName]="i" placeholder="e.g. Eggs"/>
              <span class="meal-form__remove"
                    (click)="removeIngredient(i)"></span>
            </label>
          </div>
        </div>
        <div class="meal-form__submit">
          <div>
            <button type="button"
                    class="button"
                    (click)="createMeal()">
              Create Meal
            </button>
            <a class="button button--cancel"
               [routerLink]="['../']">Cancel</a>
          </div>
        </div>
      </form>

    </div>
  `
})
export class MealFormComponent {

  @Output() create: EventEmitter<Meal> = new EventEmitter<Meal>();

  public form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    ingredients: this.fb.array([''])
  });

  constructor(private fb: FormBuilder) {
  }

  get ingredients(): FormArray {
    return this.form.get('ingredients') as FormArray;
  }

  get required(): boolean {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  public addIngredient() {
    this.ingredients.push(new FormControl(''))
  }

  public removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  public createMeal(): void {
    if (this.form.value) {
      this.create.emit(this.form.value);
    }
  }
}
