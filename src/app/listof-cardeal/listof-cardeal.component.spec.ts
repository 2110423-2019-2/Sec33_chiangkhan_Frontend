import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListofCardealComponent } from './listof-cardeal.component';

describe('ListofCardealComponent', () => {
  let component: ListofCardealComponent;
  let fixture: ComponentFixture<ListofCardealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListofCardealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListofCardealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
