import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordTimerComponent } from './word-timer.component';

describe('WordTimerComponent', () => {
  let component: WordTimerComponent;
  let fixture: ComponentFixture<WordTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
