import { createAction, props } from '@ngrx/store';
import { works, work } from '../work-list/worl-list-interfaces';

export const loadWorkList = createAction(
	'[worklist.component], Load workList',
	props<{ nItems: string; offset: number; words: string; filter: string }>()
);
export const saveWorkList = createAction(
	'[worklist.component], Save workList',
	props<{ newWorkList: work[]; newTotalItems: number }>()
);
export const saveWords = createAction('[worklist.component], Save words', props<{ newWords: string }>());
