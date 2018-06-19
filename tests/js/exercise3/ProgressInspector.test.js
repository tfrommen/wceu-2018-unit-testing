import '../__stubs__/wp';

import React from 'react';

import ProgressInspector from '../../../js/src/blocks/Progress/Inspector';
import { shallow } from 'enzyme';

const { RangeControl } = wp.components;

/**
 * Complete the tests of the functions found at /js/src/blocks/Progress/Inspector.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/expect.html
 * - https://facebook.github.io/jest/docs/en/using-matchers.html
 * - http://airbnb.io/enzyme/docs/api/shallow.html
 */
describe( '<ProgressInspector />', () => {
	/**
	 * TODO: Complete tests by adding missing value and expectation.
	 */
	test( 'should render as expected', () => {
		const max = 42;
		const setMax = () => Symbol( 'setMax' );
		const wrapper = shallow(
			<ProgressInspector max={ max } setMax={ setMax } />
		);

		const rangeControl = wrapper.find( RangeControl );
		// Fill in the missing value.
		expect( rangeControl ).toHaveLength( 1 );
		// Add missing expectation to ensure the control element has all expected props.
		expect( rangeControl.props() ).toMatchObject( {
			max: '',
			min: '0',
			value: max,
			onChange: setMax,
		} );
	} );
} );
