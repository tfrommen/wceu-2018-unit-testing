import React from 'react';

import LoremIpsumSave from '../../../../js/src/blocks/LoremIpsum/Save';

import { shallow } from 'enzyme';

jest.mock( '../../../../js/src/utils/array', () => ( {
	mapObjectsToProperty: ( data, propertyName ) => data.map( ( item ) => item[ propertyName ] ),
} ) );

describe( '<LoremIpsumSave />', () => {
	test( 'should not render anything for empty headline and paragraphs', () => {
		const wrapper = shallow(
			<LoremIpsumSave />
		);

		expect( wrapper.html() ).toBe( '' );
	} );

	test( 'should render heading as expected', () => {
		const headingLevel = 'H2';
		const headingText = 'Some Heading Here';
		const attributes = {
			headingLevel,
			headingText,
		};
		const wrapper = shallow(
			<LoremIpsumSave attributes={ attributes } />
		);

		const headingElement = wrapper.find( headingLevel.toLowerCase() );

		expect( headingElement.length );
		expect( headingElement.props() ).toMatchObject( { children: headingText } );
	} );

	test( 'should render paragraphs as expected', () => {
		const paragraphs = [
			{
				children: 'foo',
			},
			{
				children: 'bar',
			},
			{
				children: 'baz',
			},
		];
		const attributes = {
			paragraphs,
		};
		const wrapper = shallow(
			<LoremIpsumSave attributes={ attributes } />
		);

		const paragraphElements = wrapper.find( 'p' );

		expect( paragraphElements.length );
		const paragraphTexts = [ ...paragraphElements ].map( ( { props } ) => props.children );
		expect( paragraphTexts ).toEqual( [
			'foo',
			'bar',
			'baz',
		] );
	} );
} );
