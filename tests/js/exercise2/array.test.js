import React from 'react';

import { mapObjectsToProperty } from '../../../js/src/utils/array';

/**
 * Fix the failing tests of the functions found at /js/src/utils/array.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/expect.html
 * - https://facebook.github.io/jest/docs/en/using-matchers.html
 */
describe( 'mapObjectsToProperty', () => {
	/**
	 * TODO: Complete the matcher call.
	 */
	test( 'should return string as is', () => {
		const data = 'Some data here...';
		const propertyName = 'children';

		const actual = mapObjectsToProperty( data, propertyName );

		// Fill in the expected value.
		expect( actual ).toBe( /* TODO */ );
	} );

	/**
	 * TODO: Add the missing expectation.
	 */
	test( 'should return JSX as is', () => {
		const data = <p>Some <code>JSX</code> here...</p>;
		const propertyName = 'children';

		const expected = data;
		const actual = mapObjectsToProperty( data, propertyName );

		// Add missing expectation.
	} );
} );
