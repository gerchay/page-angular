import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VuelosInfoComponent } from './vuelos-info.component';

describe('VuelosInfoComponent', () => {
  let component: VuelosInfoComponent;
  let fixture: ComponentFixture<VuelosInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VuelosInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VuelosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
