import { Component, Input, OnInit } from '@angular/core';
import { work } from '../../worl-list-interfaces';

@Component({
	selector: 'app-item',
	templateUrl: './item.component.html',
	styleUrls: [ './item.component.scss' ]
})
export class ItemComponent implements OnInit {
	@Input() item: work | undefined;

	constructor() {}

	ngOnInit(): void {}

	openLink(url: string | undefined): void {
		console.log('click', url);
		if (url) {
			window.open(url);
		}
	}
}
