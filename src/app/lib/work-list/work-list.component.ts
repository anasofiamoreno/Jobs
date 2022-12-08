import { Component, Input, OnInit } from '@angular/core';
import { work } from './worl-list-interfaces';
import { select, Store } from '@ngrx/store';
import { loadWorkList } from '../state/state.actions';
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
	@Input() filter: string = '';
	results: boolean = false;
	loading: boolean = false;

	constructor(private store$: Store<any>) {}

	ngOnInit(): void {
		this.store$.dispatch(
			loadWorkList({ nItems: this.selectedNitems, offset: 0, words: this.wordToFind, filter: this.filter })
		);

		this.store$.pipe(select(selectWorkList)).subscribe((data) => {
			this.loading = false;
			this.works = data.worklist;
			this.totalItems = data.totalItems;
			this.results = data.worklist.length > 0 ? true : false;
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

	updatePage(nItems: string): void {
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

	collectionSize(totalItems: number): number {
		if (totalItems >= 300) {
			if (parseInt(this.selectedNitems) === 20) {
				return 300;
			} else if (parseInt(this.selectedNitems) === 10) {
				return 200;
			} else if (parseInt(this.selectedNitems) === 5) {
				return 100;
			}
		}
		return totalItems;
	}
}
