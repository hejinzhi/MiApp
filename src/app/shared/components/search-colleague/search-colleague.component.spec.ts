/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SearchColleagueComponent } from './search-colleague.component';

describe('SearchColleagueComponent', () => {
  let component: SearchColleagueComponent;
  let fixture: ComponentFixture<SearchColleagueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchColleagueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchColleagueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
