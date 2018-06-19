import { getSentences } from '../../../js/src/utils/text';

/**
 * Fix the failing tests of the functions found at /js/src/utils/text.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/expect.html
 * - https://facebook.github.io/jest/docs/en/using-matchers.html
 */
describe( 'getSentences', () => {
	/**
	 * TODO: Fix the test by using the correct matcher.
	 */
	test( 'should return empty array for any non-string', () => {
		const text = 42;

		const expected = [];
		const actual = getSentences( text );

		// Use the correct matcher (i.e., not toBe()).
		expect( actual ).toEqual( expected );
	} );

	/**
	 * TODO: Add the missing expectation.
	 */
	test( 'should return empty array for empty string', () => {
		const text = '';

		const expected = [];
		const actual = getSentences( text );

		// Add missing expectation.
		expect( actual ).toEqual( expected );
	} );

	/**
	 * TODO: Add the missing expectation.
	 */
	test( 'should return array with given sentence', () => {
		const text = 'This is one sentence.';

		// Fill in the expected string.
		const expected = [
			text,
		];
		const actual = getSentences( text );

		// Add missing expectation.
		expect( actual ).toEqual( expected );
	} );

	/**
	 * TODO: Add the missing expectation.
	 */
	test( 'should return array with all given sentences', () => {
		const text = `
This is a sentence.
And there is another one.
  
Oh, and here is yet another sentence.
`;

		// Add missing expectation.
		const expected = [
			'This is a sentence.',
			'And there is another one.',
			'Oh, and here is yet another sentence.',
		];
		const actual = getSentences( text );

		expect( actual ).toEqual( expected );
	} );
} );
