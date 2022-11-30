import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { saveWords } from '../state/state.actions';

@Component({
	selector: 'app-homepage',
	templateUrl: './homepage.component.html',
	styleUrls: [ './homepage.component.scss' ]
})
export class HomepageComponent implements OnInit {
	wordToFind: string = 'waitress';

	constructor(private store$: Store<any>) {}

	ngOnInit(): void {}

	findWord(word: string): void {
		if (word !== '') {
			word = word.replace(' ', '+');
			this.store$.dispatch(saveWords({ newWords: word }));
			this.wordToFind = word;
		} else {
			alert('Field cant be empty: Please fill field');
		}
	}
}
