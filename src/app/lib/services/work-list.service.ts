import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class WorkListService {
	api: string = 'https://api.crossref.org/works?query=renear+ontologies&rows=10&offset=20';
	responseWorkList: object = {};

	constructor(private http: HttpClient) {}

	public getList(nItems: string, offset: number = 0, words: string, filter: string): Observable<any> {
		if (filter !== '') {
			filter = '.' + filter.toLowerCase();
		} else {
			filter = filter;
		}

		return this.http.get<any>(
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
