import { Component, Input, OnInit } from '@angular/core';
import { works, work } from './worl-list-interfaces';
import { WorkListService } from '../services/work-list.service';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { loadWorkList, saveWorkList } from '../state/state.actions';
import { selectWords, selectWorkList } from '../state/state.selectors';

@Component({
	selector: 'app-work-list',
	templateUrl: './work-list.component.html',
	styleUrls: [ './work-list.component.scss' ]
})
export class WorkListComponent implements OnInit {
	@Input() wordToFind = '';
	works: work[] = [];
	nItems: string[] = [ '5', '10', '20' ];
	selectedNitems: string = '10';
	page: number = 1;
	totalItems: number = 0;
	filter: string = '';
	filters: string[] = [ 'Title', 'Author', 'Description' ];
	results: boolean = false;
	loading: boolean = false;

	constructor(private workListService: WorkListService, private store$: Store<any>) {}

	ngOnInit(): void {
		this.store$.dispatch(
			loadWorkList({ nItems: this.selectedNitems, offset: 0, words: this.wordToFind, filter: this.filter })
		);

		this.store$.pipe(select(selectWorkList)).subscribe((data) => {
			this.loading = false;
			this.works = data.worklist;
			this.totalItems = data.totalItems;
			this.results = data.worklist.length() > 0 ? true : false;
		});

		this.store$.pipe(select(selectWords)).subscribe((data) => {
			if (data) {
				this.loading = true;
				this.store$.dispatch(
					loadWorkList({ nItems: this.selectedNitems, offset: 0, words: data, filter: this.filter })
				);
			}
		});
	}

	updatePage(nItems: any): void {
		console.log('yes');
		this.loading = true;
		this.selectedNitems = nItems;
		this.store$.dispatch(
			loadWorkList({ nItems: this.selectedNitems, offset: 0, words: this.wordToFind, filter: this.filter })
		);
	}

	parse(value: string) {
		return parseInt(value);
	}

	changePage() {
		this.loading = true;
		console.log(this.page);
		this.store$.dispatch(
			loadWorkList({
				nItems: this.selectedNitems,
				offset: (this.page - 1) * parseInt(this.selectedNitems),
				words: this.wordToFind,
				filter: this.filter
			})
		);
	}

	updateFilter(filter: string) {
		this.filter = filter;
	}
}
