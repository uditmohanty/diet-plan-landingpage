import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicQuestionsComponent } from './dynamic-questions.component';

describe('DynamicQuestionsComponent', () => {
  let component: DynamicQuestionsComponent;
  let fixture: ComponentFixture<DynamicQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicQuestionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
