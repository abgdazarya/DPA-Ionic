import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  standalone: true
})
export class BottomSheetComponent {
  @Input() onDismiss: any = null
  constructor() { }
  
  handleBack = () => {
    if(this.onDismiss){
      this.onDismiss()
    }
  }
} 
