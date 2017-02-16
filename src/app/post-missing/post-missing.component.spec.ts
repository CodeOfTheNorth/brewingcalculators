/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PostMissingComponent } from './post-missing.component';

describe('PostMissingComponent', () => {
  let component: PostMissingComponent;
  let fixture: ComponentFixture<PostMissingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostMissingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
