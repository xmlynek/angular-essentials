import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {


  transform(value: string | number, inputType?: 'cel' | 'fah', outputType?: 'cel' | 'fah'): any {
    if (inputType === 'cel' && outputType === 'fah') {
      return `${(+value * 9 / 5 + 32).toFixed(2)} F`;
    } else if (inputType === 'fah' && outputType === 'cel') {
      return `${((+value - 32) * 5 / 9).toFixed(2)} C`;
    } else {
      if (outputType === 'fah') {
        return `${(+value).toFixed(2)} F`;
      } else {
        return `${(+value).toFixed(2)} C`;
      }
    }
  }

}
