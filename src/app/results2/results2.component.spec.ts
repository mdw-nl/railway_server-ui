import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Results2Component } from './results2.component';

describe('Results2Component', () => {
  let component: Results2Component;
  let fixture: ComponentFixture<Results2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Results2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Results2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
