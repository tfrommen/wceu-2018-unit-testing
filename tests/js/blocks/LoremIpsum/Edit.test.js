import '../../__stubs__/wp';

import React from 'react';

import LoremIpsumEdit from '../../../../js/src/blocks/LoremIpsum/Edit';

import { shallow } from 'enzyme';

import LoremIpsumInspector from '../../../../js/src/blocks/LoremIpsum/Inspector';
import LoremIpsumSave from '../../../../js/src/blocks/LoremIpsum/Save';

jest.mock( '../../../../js/src/utils/text', () => ( {
	getRandomHeading: () => 'Random Heading',
	getRandomParagraph: () => 'Random paragraph.',
} ) );

describe( '<LoremIpsumEdit />', () => {
	test( 'should ensure at least one paragraph before mounting', () => {
		const setAttributes = jest.fn();
		shallow(
			<LoremIpsumEdit setAttributes={ setAttributes } />
		);

		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes ).toHaveBeenCalledWith( {
			paragraphs: [
				'Random paragraph.',
			],
		} );
	} );

	test( 'should not overwrite passed paragraphs', () => {
		const attributes = {
			paragraphs: [
				'Some paragraph here.'
			],
		};
		const setAttributes = jest.fn();
		shallow(
			<LoremIpsumEdit attributes={ attributes } setAttributes={ setAttributes } />
		);

		expect( setAttributes ).toHaveBeenCalledTimes( 0 );
	} );

	test( 'should properly handle updating the heading', () => {
		const setAttributes = jest.fn();
		const wrapper = shallow(
			<LoremIpsumEdit setAttributes={ setAttributes } />
		);
		const instance = wrapper.instance();

		// Reset due to the call in the componentWillMonut() lifecycle method.
		setAttributes.mockReset();

		const headingLevel = 'H2';
		instance.updateHeading( headingLevel );

		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes ).toHaveBeenCalledWith( {
			headingLevel,
			headingText: 'Random Heading',
		} );
	} );

	test( 'should clear heading text when heading has been disabled', () => {
		const setAttributes = jest.fn();
		const wrapper = shallow(
			<LoremIpsumEdit setAttributes={ setAttributes } />
		);
		const instance = wrapper.instance();

		const headingLevel = '';
		instance.updateHeading( headingLevel );

		expect( setAttributes ).toHaveBeenCalledWith( {
			headingLevel,
			headingText: '',
		} );
	} );

	test( 'should properly handle updating the paragraphs', () => {
		const setAttributes = jest.fn();
		const wrapper = shallow(
			<LoremIpsumEdit setAttributes={ setAttributes } />
		);
		const instance = wrapper.instance();

		// Reset due to the call in the componentWillMonut() lifecycle method.
		setAttributes.mockReset();

		instance.updateParagraphs( 3 );

		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes ).toHaveBeenCalledWith( {
			paragraphs: [
				'Random paragraph.',
				'Random paragraph.',
				'Random paragraph.',
			],
		} );
	} );

	test( 'should render as expected', () => {
		const headingLevel = 'H2';
		const headingText = 'Some Heading Here';
		const paragraphs = [
			'First paragraph.',
			'Second paragraph.',
			'Third paragraph.',
		];
		const attributes = {
			headingLevel,
			headingText,
			paragraphs,
		};
		const wrapper = shallow(
			<LoremIpsumEdit attributes={ attributes } setAttributes={ () => {} } />
		);
		const instance = wrapper.instance();

		const inspector = wrapper.find( LoremIpsumInspector );
		expect( inspector.length );
		expect( inspector.props() ).toMatchObject( {
			headingLevel,
			numberParagraphs: paragraphs.length,
			onChangeHeadingLevel: instance.updateHeading,
			onChangeNumberParagraphs: instance.updateParagraphs,
		} );

		const save = wrapper.find( LoremIpsumSave );
		expect( save.length );
		expect( save.props() ).toMatchObject( { attributes } );
	} );

	test( 'should render with correct defaults', () => {
		const wrapper = shallow(
			<LoremIpsumEdit setAttributes={ () => {} } />
		);

		const inspector = wrapper.find( LoremIpsumInspector );
		expect( inspector.length );
		expect( inspector.props() ).toMatchObject( {
			headingLevel: '',
			numberParagraphs: 1,
		} );
	} );
} );
