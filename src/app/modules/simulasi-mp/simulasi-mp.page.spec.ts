import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimulasiMpPage } from './simulasi-mp.page';

describe('SimulasiMpPage', () => {
  let component: SimulasiMpPage;
  let fixture: ComponentFixture<SimulasiMpPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SimulasiMpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
