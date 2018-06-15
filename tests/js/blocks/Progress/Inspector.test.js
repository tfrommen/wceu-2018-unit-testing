import '../../__stubs__/wp';

import React from 'react';

import ProgressInspector from '../../../../js/src/blocks/Progress/Inspector';
import { shallow } from 'enzyme';

const { RangeControl } = wp.components;

describe( '<ProgressInspector />', () => {
	test( 'should render as expected', () => {
		const max = 42;
		const setMax = () => Symbol( 'setMax' );
		const wrapper = shallow( <ProgressInspector max={ max } setMax={ setMax } /> );

		const rangeControl = wrapper.find( RangeControl );
		expect( rangeControl ).toHaveLength( 1 );
		expect( rangeControl.props() ).toMatchObject( {
			max: '',
			min: '0',
			value: max,
			onChange: setMax,
		} );
	} );
} );
