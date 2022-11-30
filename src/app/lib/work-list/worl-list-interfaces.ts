export interface works {
	workList: work[];
}

export interface work {
	title: string;
	publisher: string;
	type: string;
	author?: author[];
	description?: string;
	'URL': string;
}

export interface author {
	affiliation: [];
	family: string;
	given: string;
	sequence: string;
}
