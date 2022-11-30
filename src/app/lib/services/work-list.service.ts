import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpResponseBase } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, map, retry, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'root'
})
export class WorkListService {
	api: string = 'https://api.crossref.org/works?query=renear+ontologies&rows=10&offset=20';
	responseWorkList: object = {};

	constructor(private http: HttpClient, private store$: Store) {}

	public getList(nItems: string, offset: number = 0, words: string, filter: string): Observable<Object> {
		if (filter !== '') {
			filter = '.' + filter.toLowerCase();
		}
		return this.http.get<object>(
			'https://api.crossref.org/works?query' +
				filter +
				'=' +
				words +
				'&rows=' +
				nItems +
				'&offset=' +
				offset.toString()
		);
	}

	public hello(): string {
		return 'Hello Ana and Reviewer :)';
	}
}
