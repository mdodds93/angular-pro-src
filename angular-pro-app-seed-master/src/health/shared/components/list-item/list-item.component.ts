import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from "@angular/core";
import {Meal} from "../../services/meals/meals.service";
import {Workout} from "../../services/workouts/workouts.service";

@Component({
  selector: 'list-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['list-item.component.scss'],
  template: `
    <div class="list-item">
      <a [routerLink]="getRoute(item)">

        <p class="list-item__name">{{item.name}}</p>
        <p class="list-item__ingredients">
          <span>
            {{item.ingredients}}
          </span>
        </p>
      </a>

      <div *ngIf="deleteMessageVisible"
           class="list-item__delete">
        <p>Delete item?</p>
        <button class="confirm"
                type="button"
                (click)="removeItem()">
          Yes
        </button>
        <button class="cancel"
                type="button"
                (click)="toggleDeleteMessage()">
          No
        </button>
      </div>
      <button class="trash"
              type="button"
              (click)="toggleDeleteMessage()">
        <img src="/img/remove.svg"/>
      </button>
    </div>`
})
export class ListItemComponent {

  public deleteMessageVisible: boolean = false;

  @Input() item: ListItemType;

  @Output() remove: EventEmitter<ListItemType> = new EventEmitter<ListItemType>();

  constructor() {
  }

  public getRoute(item: ListItemType): string[] {
    return [`../meals`, item.$key];
  }

  public removeItem(): void {
    this.remove.emit(this.item);
  }

  public toggleDeleteMessage(): void {
    this.deleteMessageVisible = !this.deleteMessageVisible;
  }
}

type ListItemType = Meal | Workout;
