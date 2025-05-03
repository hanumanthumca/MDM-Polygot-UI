import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmHeaderComponent } from './mdm-header.component';

describe('MdmHeaderComponent', () => {
  let component: MdmHeaderComponent;
  let fixture: ComponentFixture<MdmHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdmHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdmHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
