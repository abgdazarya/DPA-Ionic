import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { QuizPointComponent } from '../quiz-point/quiz-point.component';

@Component({
  selector: 'app-quiz-selesai',
  templateUrl: './quiz-selesai.component.html',
  styleUrls: ['./quiz-selesai.component.scss'],
})
export class QuizSelesaiComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  
  closeModal() {
    this.lihatPoint()
  }

  async lihatPoint() {
   this.modalCtrl.dismiss(true)
  }

}
