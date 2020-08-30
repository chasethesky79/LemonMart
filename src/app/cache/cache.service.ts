import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor() { }

  getItem<T>(key: string): T {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  setItem(key: string, value: object | string): void {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  }
}
