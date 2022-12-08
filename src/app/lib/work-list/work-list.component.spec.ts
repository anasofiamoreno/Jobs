import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { WorkListComponent } from './work-list.component';

describe('WorkListComponent', () => {
	let component: WorkListComponent;
	let fixture: ComponentFixture<WorkListComponent>;
	let store$: Store<any>;
	const initialState = {
		state: {
			workList: [
				{
					title: 'THE WAITRESS ANGELS SPEAK TO ME IN A VISION',
					publisher: 'University of Pittsburgh Press',
					type: 'book-chapter',
					URL: 'http://dx.doi.org/10.2307/j.ctt5hjnsk.31'
				}
			],
			words: 'Test'
		}
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ WorkListComponent ],
			providers: [ provideMockStore({ initialState }) ]
		}).compileComponents();
	});

	beforeEach(() => {
		store$ = TestBed.inject(MockStore);
		fixture = TestBed.createComponent(WorkListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('ngOnIni()', () => {
		component.selectedNitems = '5';
		component.wordToFind = 'Test';
		component.filter = 'Title';

		component.ngOnInit();

		expect(component.works[0]).toEqual({
			URL: 'http://dx.doi.org/10.2307/j.ctt5hjnsk.31',
			publisher: 'University of Pittsburgh Press',
			title: 'THE WAITRESS ANGELS SPEAK TO ME IN A VISION',
			type: 'book-chapter'
		});
	});

	it('updatePage()', () => {
		const nItems = '10';
		component.wordToFind = 'Test';
		component.filter = 'Title';
		const spy = jest.spyOn(store$, 'dispatch');

		component.updatePage(nItems);

		expect(spy).toHaveBeenCalledWith({
			filter: 'Title',
			nItems: '10',
			offset: 0,
			type: '[worklist.component], Load workList',
			words: 'Test'
		});
	});

	it('changePage()', () => {
		component.selectedNitems = '20';
		component.wordToFind = 'Test';
		component.filter = 'Title';
		component.page = 2;
		const spy = jest.spyOn(store$, 'dispatch');

		component.changePage();

		expect(spy).toHaveBeenCalledWith({
			filter: 'Title',
			nItems: '20',
			offset: 20,
			type: '[worklist.component], Load workList',
			words: 'Test'
		});
	});

	it('updateFilter()', () => {
		component.filter = 'title';

		component.updateFilter('author');

		expect(component.filter).toBe('author');
	});

	it('collectionSize(), result 400 pages 20', () => {
		const totalItems = 400;
		component.selectedNitems = '20';

		const result = component.collectionSize(totalItems);

		expect(result).toBe(300);
	});

	it('collectionSize(), result 400 pages 10', () => {
		const totalItems = 400;
		component.selectedNitems = '10';

		const result = component.collectionSize(totalItems);

		expect(result).toBe(200);
	});

	it('collectionSize(), result 400 pages 5', () => {
		const totalItems = 400;
		component.selectedNitems = '5';

		const result = component.collectionSize(totalItems);

		expect(result).toBe(100);
	});
});
