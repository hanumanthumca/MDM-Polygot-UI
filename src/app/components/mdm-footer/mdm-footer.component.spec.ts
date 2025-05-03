import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MdmFooterComponent } from './mdm-footer.component';

describe('MdmFooterComponent', () => {
  let component: MdmFooterComponent;
  let fixture: ComponentFixture<MdmFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MdmFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MdmFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
