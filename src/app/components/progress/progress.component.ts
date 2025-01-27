import { Component, computed, input, InputSignal, Signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { ListTypeEnum } from '../../enums/list-type.enum';

@Component({
  selector: 'app-progress',
  imports: [ NgStyle ],
  templateUrl: './progress.component.html',
  standalone: true,
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  options: InputSignal<Record<ListTypeEnum, string[]>> =
    input.required<Record<ListTypeEnum, string[]>>();

  state: Signal<Record<ListTypeEnum, number>> = computed(() => {
    const options: Record<ListTypeEnum, string[]> = this.options();
    const sum = options[ListTypeEnum.todo]
      .concat(options[ListTypeEnum.doLater])
      .concat(options[ListTypeEnum.completed]);

    return {
      [ListTypeEnum.todo]: Math.round(options[ListTypeEnum.todo].length * 100 / sum.length),
      [ListTypeEnum.doLater]: Math.round(options[ListTypeEnum.doLater].length * 100 / sum.length),
      [ListTypeEnum.completed]: Math.round(options[ListTypeEnum.completed].length * 100 / sum.length)
    };
  });

  protected readonly ListTypeEnum = ListTypeEnum;
}
