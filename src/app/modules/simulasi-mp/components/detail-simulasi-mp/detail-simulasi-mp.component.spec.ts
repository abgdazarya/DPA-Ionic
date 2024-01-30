import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailSimulasiMpComponent } from './detail-simulasi-mp.component';

describe('DetailSimulasiMpComponent', () => {
  let component: DetailSimulasiMpComponent;
  let fixture: ComponentFixture<DetailSimulasiMpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSimulasiMpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailSimulasiMpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
