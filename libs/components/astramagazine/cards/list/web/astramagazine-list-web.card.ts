import { Component } from '@angular/core';
import { AstramagazineListCardBase } from '../astramagazine-list.card.base';

@Component({
  selector: 'app-astramagazine-list-web-card',
  templateUrl: './astramagazine-list-web.card.html',
  styleUrls: ['./astramagazine-list-web.card.scss'],
})
export class AstramagazineListWebCard extends AstramagazineListCardBase {
  
  truncateHTML(text: string, charlimit:number): string {
    if (!text) {
      return text;
    }

    const words = text.toLowerCase().split(' ');
    const capitalizedWords = words.map(word => {
        if (word.length > 0) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
        return word;
    });

    const result = capitalizedWords.join(' ');
    if (result.length > charlimit) {
        return result.substring(0, charlimit) + "...";
    }

    return result;
  }
}
