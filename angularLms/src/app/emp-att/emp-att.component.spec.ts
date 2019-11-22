import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAttComponent } from './emp-att.component';

describe('EmpAttComponent', () => {
  let component: EmpAttComponent;
  let fixture: ComponentFixture<EmpAttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpAttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
