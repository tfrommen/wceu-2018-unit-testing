import data from '../../../js/src/blocks/LoremIpsum/data';

/**
 * Fix the failing tests of the functions found at /js/src/blocks/LoremIpsum/data.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/expect.html
 * - https://facebook.github.io/jest/docs/en/using-matchers.html
 */
describe( 'data', () => {
	/**
	 * TODO: Fix the test by using the appropriate matcher.
	 */
	test( 'should be a multi-line string', () => {
		expect( data ).toBe( /\n/ );
	} );
} );
