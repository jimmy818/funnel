import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTopbarComponent } from './profile-topbar.component';

describe('ProfileTopbarComponent', () => {
  let component: ProfileTopbarComponent;
  let fixture: ComponentFixture<ProfileTopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTopbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
