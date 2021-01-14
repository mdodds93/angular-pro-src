import {Pipe, PipeTransform} from "@angular/core";
import {Workout} from "../services/workouts/workouts.service";

@Pipe({
  name: 'workout'
})
export class WorkoutPipe implements PipeTransform {
  transform(value: any): any {
    if ((value as Workout).type === 'endurance') {
      return `Distance: ${(value as Workout).endurance.distance}km, Duration: ${(value as Workout).endurance.duration} minutes`
    } else  {
      return `Weight: ${(value as Workout).strength.weight}kg, Reps: ${(value as Workout).strength.reps}, Sets: ${(value as Workout).strength.sets}`
    }
  }
}
