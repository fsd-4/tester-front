import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavolComponent } from './savol.component';

describe('SavolComponent', () => {
  let component: SavolComponent;
  let fixture: ComponentFixture<SavolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
