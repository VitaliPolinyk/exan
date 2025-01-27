import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExanInputComponent } from '../../components/exan-input/exan-input.component';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { MatIcon } from '@angular/material/icon';
import { ListTypeEnum } from '../../enums/list-type.enum';
import { StorageService } from '../../services/storage.service';
import { DatePipe, NgStyle } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgressComponent } from '../../components/progress/progress.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-board-page',
  imports: [
    MatExpansionModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    ExanInputComponent,
    ListItemComponent,
    MatIcon,
    NgStyle,
    FormsModule,
    DatePipe,
    ProgressComponent,
    MatButtonModule
  ],
  templateUrl: './board-page.component.html',
  standalone: true,
  styleUrl: './board-page.component.scss'
})
export class BoardPageComponent implements OnInit {
  readonly panelOpenStateDoLater: WritableSignal<boolean> = signal(false);
  readonly panelOpenStateCompleted: WritableSignal<boolean> = signal(false);
  readonly storageService: StorageService = inject(StorageService);
  searchValue: string = '';

  defaultValues: Record<ListTypeEnum, string[]> = {
    [ListTypeEnum.todo]: [ 'Get to work', 'Pick up groceries' ],
    [ListTypeEnum.doLater]: [ 'Go home', 'Fall asleep' ],
    [ListTypeEnum.completed]: [ 'Get up', 'Brush teeth' ]
  };

  listItems: WritableSignal<Record<ListTypeEnum, string[]>> = signal({
    [ListTypeEnum.todo]: [],
    [ListTypeEnum.doLater]: [],
    [ListTypeEnum.completed]: []
  });

  date: Date = new Date();

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    this.storageService.saveItems(this.listItems());
  }

  addItem(): void {
    const items = this.listItems();
    items[ListTypeEnum.todo].push(this.searchValue);
    this.listItems.set({...items});
    this.storageService.saveItems(items);
  }

  actionClick(value: { value: string, nextType: ListTypeEnum, currentType: ListTypeEnum }): void {
    const items: Record<ListTypeEnum, string[]> = this.listItems();
    const index: number = items[value.currentType].findIndex((it) => it === value.value);

    if (index < 0) {
      return;
    }

    const element: string = items[value.currentType][index];
    items[value.currentType] = items[value.currentType].filter((el) => el !== element);
    items[value.nextType].unshift(element);
    this.listItems.set({...items});

    this.storageService.saveItems(items);
  }

  ngOnInit(): void {
    const items: Record<ListTypeEnum, string[]> | null = this.storageService.getItems();
    this.listItems.set(items ?? this.defaultValues);
  }

  reset(): void {
    this.listItems.set({...this.defaultValues});
    this.storageService.saveItems(this.listItems());
  }

  protected readonly ListTypeEnum = ListTypeEnum;
}
