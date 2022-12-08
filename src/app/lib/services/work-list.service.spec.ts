import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { WorkListService } from './work-list.service';

describe('WorkListService', () => {
	let service: WorkListService;
	let httpClient: HttpClient;
	let httpTestingController: HttpTestingController;

	const tete = jest.fn(function get() {
		console.log('Yes');
	});

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpClient,
					useValue: {
						get: (data: string) => {
							return data;
						}
					}
				},
				HttpClientTestingModule,
				HttpTestingController
			]
		});

		service = TestBed.inject(WorkListService);
		httpClient = TestBed.inject(HttpClient);
		httpTestingController = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('getList()', () => {
		const nItems = '10';
		const offset = 0;
		const words = 'Test';
		const filter = 'title';

		let result = service.getList(nItems, offset, words, filter);

		expect(result).toEqual('https://api.crossref.org/works?query.title=Test&rows=10&offset=0');

		result = service.getList(nItems, offset, words, '');

		expect(result).toEqual('https://api.crossref.org/works?query=Test&rows=10&offset=0');
	});

	it('hello()', () => {
		const result = service.hello();
		expect(result).toBe('Hello Ana and Reviewer :)');
	});
});
