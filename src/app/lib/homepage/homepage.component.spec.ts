import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageComponent } from './homepage.component';

import { Store } from '@ngrx/store';

describe('HomepageComponent', () => {
	let component: HomepageComponent;
	let fixture: ComponentFixture<HomepageComponent>;
	const initialStore = {};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ HomepageComponent ],
			imports: [],
			providers: [ { provide: Store, useValue: initialStore } ]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HomepageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('Test Filter', () => {
		const filter = 'Author';
		component.updateFilter(filter);
		expect(component.filter).toBe('Author');
	});
});
