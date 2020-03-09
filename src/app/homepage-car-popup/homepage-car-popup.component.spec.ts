import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCarPopupComponent } from './homepage-car-popup.component';

describe('HomepageCarPopupComponent', () => {
  let component: HomepageCarPopupComponent;
  let fixture: ComponentFixture<HomepageCarPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageCarPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
