import { Injectable } from '@angular/core';
import { ListTypeEnum } from '../enums/list-type.enum';

@Injectable({providedIn: 'root'})
export class StorageService {
  saveItems(value: Record<ListTypeEnum, string[]>) {
    sessionStorage.setItem('items', JSON.stringify(value));
  }

  getItems(): Record<ListTypeEnum, string[]> | null  {
   const items = sessionStorage.getItem('items');
   return !!items ? JSON.parse(items) : null;
  }
}
