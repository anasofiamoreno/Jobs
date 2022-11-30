import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { WorkListService } from '../services/work-list.service';
import { work } from '../work-list/worl-list-interfaces';
import * as actions  from './state.actions';

@Injectable()
export class WorkListEffects {
	saveWorkList$ = createEffect(() =>
		this.actions$.pipe(
			ofType(actions.loadWorkList),
			map(action => { return action}),
			switchMap((data) =>
				this.workListServices.getList(data.nItems, data.offset, data.words, data.filter).pipe(
					map( (data: any) => {
	          const workList: work[] = [];
	          data.message.items.forEach((element: work) => {
              workList.push({ 
								title: element.title?.[0],
								publisher: element.publisher,
								type: element.type,
								author: element?.author,
								description: element?.description,
								URL: element.URL
							});
	          });
	          return actions.saveWorkList({ newWorkList: workList, newTotalItems: data.message['total-results']})
          }),
					catchError((error) => {
						console.log(error);
						return EMPTY;
					})
		  	)
		  )
		)
	);

	constructor(private actions$: Actions, private workListServices: WorkListService, private store$: Store) {}
}
