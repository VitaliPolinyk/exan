import { ChangeDetectionStrategy, Component, EventEmitter, input, InputSignal, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { ListTypeEnum } from '../../enums/list-type.enum';

@Component({
  selector: 'app-list-item',
  imports: [
    MatIcon,
    NgStyle
  ],
  templateUrl: './list-item.component.html',
  standalone: true,
  styleUrl: './list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListItemComponent<T> {
  title: InputSignal<T> = input.required<T>();
  listType: InputSignal<ListTypeEnum> = input.required<ListTypeEnum>();
  @Output() actionClick: EventEmitter<{ value: T, nextType: ListTypeEnum, currentType: ListTypeEnum }> =
    new EventEmitter<{ value: T, nextType: ListTypeEnum, currentType: ListTypeEnum }>();
  protected readonly ListTypeEnum = ListTypeEnum;
}
