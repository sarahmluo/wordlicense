import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordListPage } from './word-list.page';

describe('WordListPage', () => {
  let component: WordListPage;
  let fixture: ComponentFixture<WordListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WordListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WordListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
