import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-leave-quiz-modal',
  templateUrl: './leave-quiz-modal.component.html',
  styleUrls: ['./leave-quiz-modal.component.scss'],
})
export class LeaveQuizModalComponent implements OnInit {
  
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  leaveQuiz() {
    this.modalCtrl.dismiss(true);
  }
}
