import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryOnePage } from './category-one.page';

describe('CategoryOnePage', () => {
  let component: CategoryOnePage;
  let fixture: ComponentFixture<CategoryOnePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CategoryOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
