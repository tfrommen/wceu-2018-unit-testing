import '../__stubs__/wp';

import LoremIpsum from '../../../js/src/blocks/LoremIpsum';

/**
 * Fix the failing tests of the broken (!) functions found at /js/src/blocks/LoremIpsum.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/getting-started.html
 */
describe( 'LoremIpsum', () => {
	const { name, settings } = LoremIpsum;
	const { attributes } = settings;

	test( 'should have expected name', () => {
		expect( name ).toBe( 'unit-testing-workshop/lorem-ipsum' );
	} );

	test( 'should have expected settings', () => {
		const expected = {
			title: 'Lorem Ipsum',
			description: expect.any( String ),
			category: 'common',
			keywords: expect.arrayContaining( [
				'lorem',
				'ipsum',
				'random text',
			] ),
		};

		expect( settings ).toMatchObject( expected );
	} );

	test( 'should have expected attributes', () => {
		const expected = {
			headingLevel: {
				type: 'string',
			},
			headingText: {
				type: 'array',
			},
			paragraphs: {
				type: 'array',
			},
		};

		expect( attributes ).toMatchObject( expected );
		expect( attributes.headingLevel.selector ).toBe( attributes.headingText.selector );
	} );
} );
