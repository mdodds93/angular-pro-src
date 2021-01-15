import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {ScheduleList} from "../../../shared/services/schedule/schedule.service";

@Component({
  selector: 'schedule-calendar',
  styleUrls: ['schedule-calendar.component.scss'],
  template: `
    <div class="calendar">
      <schedule-controls [selected]="selectedDay"
                         (move)="onChange($event)"></schedule-controls>
      <schedule-days [selected]="selectedDayIndex"
                     (select)="selectDay($event)"></schedule-days>
      <schedule-section *ngFor="let section of sections"
                        [name]="section.name"
                        [section]="getSection(section.key)"
                        (select)="selectSection($event, section.key)"></schedule-section>
    </div>`
})
export class ScheduleCalendarComponent implements OnChanges {
  selectedDayIndex: number;
  selectedDay: Date;
  selectedWeek: Date;

  sections: { key: string, name: string } [] = [
    {key: 'morning', name: 'Morning'},
    {key: 'lunch', name: 'Lunch'},
    {key: 'evening', name: 'Evening'},
    {key: 'snacks', name: 'Snacks and Drinks'}
  ];

  @Input() items: ScheduleList;
  @Output() change: EventEmitter<Date> = new EventEmitter<Date>();
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  @Input() set date(date: Date) {
    this.selectedDay = new Date(date.getTime())
  }

  private static getStartOfWeek(date: Date): Date {
    const day: number = date.getDay();
    const diff: number = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  private static getToday(date: Date): number {
    let today = date.getDay() - 1;
    if (today < 0) {
      today = 6;
    }
    return today;
  }

  getSection(name: string): ScheduleList {
    return this.items && this.items[name] || {};
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDayIndex = ScheduleCalendarComponent.getToday(this.selectedDay);
    this.selectedWeek = ScheduleCalendarComponent.getStartOfWeek(new Date(this.selectedDay));
  }

  onChange(weekOffset: number) {
    const startOfWeek = ScheduleCalendarComponent.getStartOfWeek(new Date());
    const startDate = new Date(startOfWeek.getFullYear(),
      startOfWeek.getMonth(), startOfWeek.getDate());
    startDate.setDate(startDate.getDate() + (weekOffset * 7));
    this.change.emit(startDate);
  }

  selectDay(index: number) {
    const selectedDay = new Date(this.selectedWeek);
    selectedDay.setDate(selectedDay.getDate() + index);
    this.change.emit(selectedDay);
  }

  selectSection({type, assigned, data}: any, section: string) {
    const day = this.selectedDay;
    this.select.emit({
      type,
      assigned,
      section,
      day,
      data
    });
  }

}
