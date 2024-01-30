import { Component } from '@angular/core';
import { AstramagazineListCardBase } from '../astramagazine-list.card.base';

@Component({
  selector: 'app-astramagazine-list-mobile-card',
  templateUrl: './astramagazine-list-mobile.card.html',
  styleUrls: ['./astramagazine-list-mobile.card.scss'],
})
export class AstramagazineListMobileCard extends AstramagazineListCardBase {
  
  truncateHTML(text: string, charlimit:number) {
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
