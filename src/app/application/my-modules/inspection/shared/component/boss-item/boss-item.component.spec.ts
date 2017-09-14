/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BossItemComponent } from './boss-item.component';

describe('BossItemComponent', () => {
  let component: BossItemComponent;
  let fixture: ComponentFixture<BossItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BossItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BossItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
