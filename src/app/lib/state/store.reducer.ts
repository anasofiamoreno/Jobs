import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import { works, work } from '../work-list/worl-list-interfaces';
import { saveWords, saveWorkList } from './state.actions';

export const initialState = { workList: [] as work[], words: '', totalItems: 0 };

export const stateReducer = createReducer(
	initialState,
	on(saveWorkList, (state, { newWorkList, newTotalItems }) => ({
		...state,
		workList: newWorkList,
		totalItems: newTotalItems
	})),
	on(saveWords, (state, { newWords }) => ({ ...state, words: newWords }))
);
