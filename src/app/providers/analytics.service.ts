import { Injectable } from '@angular/core';
declare var gtag: any;

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor() {}

  startTrackerWithId(id: any) {
    gtag('config', id);
  }

  trackView(pageUrl: string, screenName: string) {}

  trackEvent(category: any, action: any, label: any, value: any) {}
}
