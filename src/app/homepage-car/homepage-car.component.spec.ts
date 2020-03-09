import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageCarComponent } from './homepage-car.component';

describe('HomepageCarComponent', () => {
  let component: HomepageCarComponent;
  let fixture: ComponentFixture<HomepageCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
