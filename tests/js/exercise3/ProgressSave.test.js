import '../../__stubs__/wp';

import React from 'react';

import ProgressSave from '../../../js/src/blocks/Progress/Save';
import { shallow } from 'enzyme';

const { RichText } = wp.editor;

/**
 * Complete the tests of the functions found at /js/src/index.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/expect.html
 * - https://facebook.github.io/jest/docs/en/using-matchers.html
 * - https://facebook.github.io/jest/docs/en/mock-functions.html
 * - http://airbnb.io/enzyme/docs/api/shallow.html
 */
describe( '<ProgressSave />', () => {
	/**
	 * TODO: Complete expectation call.
	 */
	test( 'should render <progress /> with given values', () => {
		const max = 100;
		const value = 42;
		const attributes = {
			max,
			value,
		};
		const wrapper = shallow(
			<ProgressSave attributes={ attributes } />
		);

		// Fill in the appropriate selector (with or without attributes) for the progress element.
		const progressElement = wrapper.find( /* TODO */ );
		// Add expectation to ensure existence (and correct props) of the progress element.
	} );

	/**
	 * TODO: Add missing expectation.
	 */
	test( 'should render <progress /> with empty max value as fallback', () => {
		const wrapper = shallow(
			<ProgressSave attributes={ { value: 42 } } />
		);

		// Add expectation to ensure existence of the progress element with empty max (string value) attribute.
	} );

	/**
	 * TODO: Fill in JSX expression, and add missing expectation.
	 */
	test( 'should render <progress /> with description', () => {
		const description = 'This is my progress.';
		const attributes = {
			description,
			value: 42,
		};
		// Fill in missing JSX expression to render the ProgressSave component.
		const wrapper = shallow(
			/* TODO */
		);

		const richTextContent = wrapper.find( RichText.Content );
		// Add expectation to ensure existence of the rich-text element with description as value (prop).
	} );
} );
