import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendOnePage } from './friend-one.page';

describe('FriendOnePage', () => {
  let component: FriendOnePage;
  let fixture: ComponentFixture<FriendOnePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FriendOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
