import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeaderComponent } from './header.component';

describe('ProfileHeaderComponent', () => {
  let component: ProfileHeaderComponent;
  let fixture: ComponentFixture<ProfileHeaderComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ProfileHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
