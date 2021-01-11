import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {Workout} from "../../../shared/services/workouts/workouts.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'workout-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['workout-form.component.scss'],
  template: `
    <div class="workout-form">

      <form [formGroup]="form">

        <div class="workout-form__name">
          <label>
            <h3>Workout name</h3>
            <input type="text"
                   placeholder="e.g. Ulster Fry"
                   formControlName="name">
            <div class="error" *ngIf="required">
              Workout name is required
            </div>
          </label>
        </div>
        <div class="workout-form__submit">
          <div>
            <button type="button"
                    class="button"
                    (click)="exists ? updateWorkout() : createWorkout()">
             {{exists? 'Save' : 'Create Workout' }}
            </button>
            <a class="button button--cancel"
               [routerLink]="['../']">Cancel</a>
          </div>

          <div class="workout-form__delete" *ngIf="exists">
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
export class WorkoutFormComponent implements OnChanges {

  @Input() workout: Workout;

  @Output() create: EventEmitter<Workout> = new EventEmitter<Workout>();
  @Output() update: EventEmitter<Workout> = new EventEmitter<Workout>();
  @Output() remove: EventEmitter<Workout> = new EventEmitter<Workout>();

  public deleteMessageVisible: boolean = false;
  public exists: boolean = false;

  public form: FormGroup = this.fb.group({
    name: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {
  }

  get required(): boolean {
    return (
      this.form.get('name').hasError('required') &&
      this.form.get('name').touched
    )
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.workout && this.workout.name) {
    //   // workout exists
    //   this.exists = true;
    //   this.emptyIngredients();
    //   const value = this.workout;
    //   this.form.patchValue(value);
    //
    //   if (value.ingredients) {
    //     for (const item of value.ingredients) {
    //       this.ingredients.push(new FormControl(item));
    //     }
    //   }
    // }
  }

  // get ingredients(): FormArray {
  //   return this.form.get('ingredients') as FormArray;
  // }
  //
  // public addIngredient() {
  //   this.ingredients.push(new FormControl(''))
  // }
  //
  // public removeIngredient(index: number): void {
  //   this.ingredients.removeAt(index);
  // }

  public createWorkout(): void {
    if (this.form.valid) {
      this.create.emit(this.form.value);
    }
  }

  public updateWorkout(): void {
    if (this.form.valid) {
      this.update.emit(this.form.value);
    }
  }

  public toggleDeleteMessage(): void {
    this.deleteMessageVisible = !this.deleteMessageVisible;
  }

  public removeItem(): void {
    this.remove.emit(this.workout);
  }

  // private emptyIngredients(): void {
  //   while (this.ingredients.controls.length) {
  //     this.ingredients.removeAt(0);
  //   }
  // }


}
