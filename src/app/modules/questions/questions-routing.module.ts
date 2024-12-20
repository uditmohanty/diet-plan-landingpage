import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions.component';
import { DynamicQuestionsComponent } from './dynamic-questions/dynamic-questions.component';

const routes: Routes = [
  { path: '', component: QuestionsComponent },
  { path: 'on-boarding', component: DynamicQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionsRoutingModule {}
