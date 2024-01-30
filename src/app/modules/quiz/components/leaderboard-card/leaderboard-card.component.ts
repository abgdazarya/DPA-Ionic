import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { decryptContent } from '@shared';

@Component({
  selector: 'app-leaderboard-card',
  templateUrl: './leaderboard-card.component.html',
  styleUrls: ['./leaderboard-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LeaderboardCardComponent implements OnInit {
  @Input() badge: number = 0;
  @Input() name: string = '';
  @Input() point: string | number = '';
  @Input() active: boolean = false;
  @Input() verify: any;
  @Input() isMe: boolean = false;
  constructor() {}

  ngOnInit() {}

  public decryptUser(content: any): any {
    if(content == false || !content) return null;
    return decryptContent(content);
  }
}
