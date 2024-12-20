import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { DynamicQuestionsComponent } from './dynamic-questions/dynamic-questions.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuestionsComponent,
    DynamicQuestionsComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    FormsModule
  ]
})
export class QuestionsModule { }
