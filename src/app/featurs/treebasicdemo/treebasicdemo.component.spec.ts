import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreebasicdemoComponent } from './treebasicdemo.component';

describe('TreebasicdemoComponent', () => {
  let component: TreebasicdemoComponent;
  let fixture: ComponentFixture<TreebasicdemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreebasicdemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TreebasicdemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
