import './__stubs__/wp';

import '../../js/src/index';

jest.mock( '../../js/src/blocks/LoremIpsum', () => ( {
	name: 'lorem-ipsum',
	settings: { lorem: 'ipsum' },
} ) );
// TODO: Add missing mock for the Progress block.

/**
 * Complete the tests of the functions found at /js/src/index.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/expect.html
 * - https://facebook.github.io/jest/docs/en/using-matchers.html
 * - https://facebook.github.io/jest/docs/en/mock-functions.html
 */
describe( 'index', () => {
	const { registerBlockType } = global.wp.blocks;

	/**
	 * TODO: Complete the test.
	 */
	test( 'should register LoremIpsum block', () => {

		// Fill in the missing value(s)/variable(s).
		expect( registerBlockType ).toHaveBeenCalledWith( /* TODO, TODO */ );
	} );

	/**
	 * TODO: Complete the test.
	 */
	test( 'should register Progress block', () => {

		// Add the missing expectation, AND mock the according block (see above).
	} );
} );
