import '../../__stubs__/wp';

import React from 'react';

import ProgressSave from '../../../../js/src/blocks/Progress/Save';
import { shallow } from 'enzyme';

const { RichText } = wp.editor;

describe( '<ProgressSave />', () => {
	test( 'should render <progress/> with given values', () => {
		const max = 100;
		const value = 42;
		const attributes = {
			max,
			value,
		};
		const wrapper = shallow(
			<ProgressSave attributes={ attributes } />
		);

		expect( wrapper.find( `progress[max=${ max }][value=${ value }]` ) ).toHaveLength( 1 );
	} );

	test( 'should render <progress/> with empty max value as fallback', () => {
		const wrapper = shallow(
			<ProgressSave attributes={ { value: 42 } } />
		);

		expect( wrapper.find( 'progress[max=""]' ) ).toHaveLength( 1 );
	} );

	test( 'should render <progress/> with description', () => {
		const description = 'This is my progress.';
		const attributes = {
			description,
			value: 42,
		};
		const wrapper = shallow(
			<ProgressSave attributes={ attributes } />
		);

		const richTextContent = wrapper.find( RichText.Content );
		expect( richTextContent ).toHaveLength( 1 );
		expect( richTextContent.prop( 'value' ) ).toBe( description );
	} );
} );
