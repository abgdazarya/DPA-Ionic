import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EKlaimPage } from './e-klaim.page';

describe('EKlaimPage', () => {
  let component: EKlaimPage;
  let fixture: ComponentFixture<EKlaimPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EKlaimPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
