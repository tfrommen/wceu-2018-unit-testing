import { mapObjectsToProperty } from '../../../js/src/utils/array';

/**
 * Fix the failing tests of the broken (!) functions found at /js/src/utils/array.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/getting-started.html
 */
describe( 'mapObjectsToProperty', () => {
	test( 'should return number as is', () => {
		const data = 42;
		const propertyName = 'children';

		const expected = data;
		const actual = mapObjectsToProperty( data, propertyName );

		expect( actual ).toBe( expected );
	} );

	test( 'should return array with objects mapped to given property, if exists', () => {
		const data = [
			'Some string here...',
			{
				nested: {
					children: [
						'Cain',
						'Abel',
					],
				},
			},
			{
				children: 42,
			},
			{
				children: false,
			},
			{
				children: undefined,
			},
			{
				children: null,
			},
			{
				children: [],
			},
		];
		const propertyName = 'children';

		const expected = [
			'Some string here...',
			{
				nested: {
					children: [
						'Cain',
						'Abel',
					],
				},
			},
			42,
			false,
			undefined,
			null,
			[],
		];
		const actual = mapObjectsToProperty( data, propertyName );

		expect( actual ).toEqual( expected );
	} );
} );
