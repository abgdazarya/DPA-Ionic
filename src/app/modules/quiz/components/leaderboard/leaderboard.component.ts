import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuizRanking } from 'libs/controllers/quiz';
import { MonthOption } from 'src/app/modules/saldo/const/month';
import { LeaderboardCardComponent } from '../leaderboard-card/leaderboard-card.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
  standalone: true,
  imports: [LeaderboardCardComponent, CommonModule],
})
export class LeaderboardComponent implements OnInit {
  @Input() showPeriod: boolean = false;
  @Input() leaderboard: QuizRanking | null | undefined;
  @Output() onClick = new EventEmitter();
  @Output() onChangePeriod = new EventEmitter();
  selectedLeaderboard: 'astra' | 'non' = 'astra';
  month = new Date().getMonth() + 1;
  monthLabel: string = '';
  year = new Date().getFullYear();
  monthOptions = MonthOption;
  constructor() {
    this.monthLabel = this.monthOptions[this.month - 1].label;
  }

  ngOnInit() {}

  handlePeriod(trigger: string) {
    if (trigger === 'prev') {
      if (this.leaderboard?.periode?.prevPeriode === null) return;
      this.onChangePeriod.emit(this.leaderboard?.periode?.prevPeriode);
      this.month -= 1;
      if (this.month === 0) {
        this.month = 12;
        this.year -= 1;
      }
      this.monthLabel = this.monthOptions[this.month - 1].label;
    } else {
      if (this.leaderboard?.periode?.nextPeriode === null) return;
      this.onChangePeriod.emit(this.leaderboard?.periode?.nextPeriode);
      this.month += 1;
      if (this.month === 13) {
        this.month = 1;
        this.year += 1;
      }
      this.monthLabel = this.monthOptions[this.month - 1].label;
    }
  }
}
