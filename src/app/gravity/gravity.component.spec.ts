/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GravityComponent } from './gravity.component';

describe('GravityComponent', () => {
  let component: GravityComponent;
  let fixture: ComponentFixture<GravityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GravityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GravityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
