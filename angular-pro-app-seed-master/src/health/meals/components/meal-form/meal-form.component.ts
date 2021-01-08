import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
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
                    (click)="exists ? updateMeal() : createMeal()">
             {{exists? 'Save' : 'Create Meal' }}
            </button>
            <a class="button button--cancel"
               [routerLink]="['../']">Cancel</a>
          </div>

          <div class="meal-form__delete" *ngIf="exists">
            <div *ngIf="deleteMessageVisible">
              <p>Delete item?</p>
              <button
                class="confirm"
                type="button"
                (click)="removeItem()">
                Yes
              </button>
              <button
                class="cancel"
                type="button"
                (click)="toggleDeleteMessage()">
                No
              </button>
            </div>
            <button class="button button--delete"
                    type="button"
                    (click)="toggleDeleteMessage()">
              Delete
            </button>
          </div>
        </div>
      </form>

    </div>
  `
})
export class MealFormComponent implements OnChanges {

  @Input() meal: Meal;

  @Output() create: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() update: EventEmitter<Meal> = new EventEmitter<Meal>();
  @Output() remove: EventEmitter<Meal> = new EventEmitter<Meal>();

  public deleteMessageVisible: boolean = false;
  public exists: boolean = false;

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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.meal && this.meal.name) {
      // meal exists
      this.exists = true;
      this.emptyIngredients();
      const value = this.meal;
      this.form.patchValue(value);

      if (value.ingredients) {
        for (const item of value.ingredients) {
          this.ingredients.push(new FormControl(item));
        }
      }
    }
  }

  public addIngredient() {
    this.ingredients.push(new FormControl(''))
  }

  public removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  public createMeal(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  public updateMeal(): void {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  public toggleDeleteMessage(): void {
    this.deleteMessageVisible = !this.deleteMessageVisible;
  }

  public removeItem(): void {
    this.remove.emit(this.meal);
  }

  private emptyIngredients(): void {
    while (this.ingredients.controls.length) {
      this.ingredients.removeAt(0);
    }
  }


}
