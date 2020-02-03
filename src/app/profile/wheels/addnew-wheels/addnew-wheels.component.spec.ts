import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewWheelsComponent } from './addnew-wheels.component';

describe('AddnewWheelsComponent', () => {
  let component: AddnewWheelsComponent;
  let fixture: ComponentFixture<AddnewWheelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewWheelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewWheelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
