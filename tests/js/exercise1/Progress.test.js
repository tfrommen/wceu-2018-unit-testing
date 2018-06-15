import '../__stubs__/wp';

import Progress from '../../../js/src/blocks/Progress';

/**
 * Fix the failing tests of the broken (!) functions found at /js/src/blocks/Progress.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/getting-started.html
 */
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
