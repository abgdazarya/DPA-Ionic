import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-quiz-point',
  templateUrl: './quiz-point.component.html',
  styleUrls: ['./quiz-point.component.scss'],
})
export class QuizPointComponent implements OnInit {
  
  @Input() waktu: string = ''
  @Input() point: number = 0
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
