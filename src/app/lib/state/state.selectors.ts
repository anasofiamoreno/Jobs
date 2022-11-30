import { createSelector, State } from '@ngrx/store';
import { work } from '../work-list/worl-list-interfaces';

export interface AppState {
	state: {}
}

export const selectFeature = (state: AppState) => state?.state;

export const selectWorkList = createSelector(selectFeature, (state: any) => {return {worklist: state.workList, totalItems: state.totalItems}});

export const selectWords = createSelector(selectFeature, (state: any) => state.words);


