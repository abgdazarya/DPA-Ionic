import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-pilih-quiz-modal',
  templateUrl: './pilih-quiz-modal.component.html',
  styleUrls: ['./pilih-quiz-modal.component.scss'],
})
export class PilihQuizModalComponent implements OnInit {
  @Input() quiz: { label: string; idQuiz: string; userPlayed: string }[] = [];
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  pilihQuiz(idQuiz: string) {
    this.modalCtrl.dismiss(idQuiz);
  }
}
