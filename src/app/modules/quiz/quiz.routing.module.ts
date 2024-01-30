import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizPage } from './quiz.page';
import { CanDeactivateGuard } from 'libs/guards/can-deactivate.guard';

const routes: Routes = [
	{
		path: '',
		component: QuizPage,
		canDeactivate: [CanDeactivateGuard],
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: [CanDeactivateGuard]
})
export class QuizRoutingModule { }
