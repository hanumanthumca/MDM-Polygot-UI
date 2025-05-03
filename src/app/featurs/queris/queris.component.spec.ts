import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerisComponent } from './queris.component';

describe('QuerisComponent', () => {
  let component: QuerisComponent;
  let fixture: ComponentFixture<QuerisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuerisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuerisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
