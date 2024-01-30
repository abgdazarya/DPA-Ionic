import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Jawaban } from 'libs/controllers/quiz';
import { interval, Subscription } from 'rxjs';
import { QuizSelesaiComponent } from '../quiz-selesai/quiz-selesai.component';

@Component({
  selector: 'app-mulai-quiz',
  templateUrl: './mulai-quiz.component.html',
  styleUrls: ['./mulai-quiz.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MulaiQuizComponent {
  @Input() soal!: { pertanyaan: string | null | undefined; gambar: string | null | undefined };
  @Input() pilihan: Jawaban[] = [];
  @Input() waktu: string = '';
  @Output() onAnswerClick = new EventEmitter();
  @Input() minutes: string = '';
  @Input() index: number = 0;
  @Input() seconds: string = '';
  @Input() point: number = 0;
  constructor(private modalCtrl: ModalController) {}

}
