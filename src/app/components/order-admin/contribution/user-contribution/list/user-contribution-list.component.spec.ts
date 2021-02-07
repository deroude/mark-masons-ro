import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserContributionListComponent } from './user-list.component';

describe('UserContributionListComponent', () => {
  let component: UserContributionListComponent;
  let fixture: ComponentFixture<UserContributionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserContributionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserContributionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
