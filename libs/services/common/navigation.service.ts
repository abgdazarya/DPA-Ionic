import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  openUrl(url: string) {
    window.open(url, '_system')
  }
}
