import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityContributionComponent } from './charity-contribution.component';

describe('CharityContributionComponent', () => {
  let component: CharityContributionComponent;
  let fixture: ComponentFixture<CharityContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharityContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharityContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
