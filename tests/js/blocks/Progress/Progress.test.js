import '../../__stubs__/wp';

import Progress from '../../../../js/src/blocks/Progress';

import ProgressEdit from '../../../../js/src/blocks/Progress/Edit';
import ProgressSave from '../../../../js/src/blocks/Progress/Save';
jest.mock( '../../../../js/src/blocks/Progress/Edit', () => Symbol( 'ProgressEdit' ) );
jest.mock( '../../../../js/src/blocks/Progress/Save', () => Symbol( 'ProgressSave' ) );

describe( 'Progress', () => {
	const { name, settings } = Progress;

	test( 'should have expected name', () => {
		expect( name ).toBe( 'unit-testing-workshop/progress' );
	} );

	test( 'should have expected settings', () => {
		const expected = {
			title: 'Progress',
			description: expect.any( String ),
			category: 'common',
			keywords: expect.arrayContaining( [
				'progress',
				'bar',
				'loading',
			] ),
			edit: ProgressEdit,
			save: ProgressSave,
		};

		expect( settings ).toMatchObject( expected );
	} );

	test( 'should have expected attributes', () => {
		const expected = {
			description: {
				type: 'array',
				default: [],
			},
			max: {
				type: 'number',
				source: 'attribute',
				selector: 'progress',
				attribute: 'max',
				default: 100,
			},
			value: {
				type: 'number',
				source: 'attribute',
				selector: 'progress',
				attribute: 'value',
				default: 42,
			},
		};

		expect( settings.attributes ).toMatchObject( expected );
	} );
} );
