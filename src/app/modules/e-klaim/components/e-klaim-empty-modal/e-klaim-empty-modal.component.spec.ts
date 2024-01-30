import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EKlaimEmptyModalComponent } from './e-klaim-empty-modal.component';

describe('EKlaimEmptyModalComponent', () => {
  let component: EKlaimEmptyModalComponent;
  let fixture: ComponentFixture<EKlaimEmptyModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EKlaimEmptyModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EKlaimEmptyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
