import React from 'react';

import { mapObjectsToProperty } from '../../../js/src/utils/array';

describe( 'mapObjectsToProperty', () => {
	test( 'should return number as is', () => {
		const data = 42;
		const propertyName = 'children';

		const expected = data;
		const actual = mapObjectsToProperty( data, propertyName );

		expect( actual ).toBe( expected );
	} );

	test( 'should return string as is', () => {
		const data = 'Some data here...';
		const propertyName = 'children';

		const expected = data;
		const actual = mapObjectsToProperty( data, propertyName );

		expect( actual ).toBe( expected );
	} );

	test( 'should return JSX as is', () => {
		const data = <p>Some <code>JSX</code> here...</p>;
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
