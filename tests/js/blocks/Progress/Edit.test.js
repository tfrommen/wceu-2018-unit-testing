import '../../__stubs__/wp';

import React from 'react';

import ProgressEdit from '../../../../js/src/blocks/Progress/Edit';

import { shallow } from 'enzyme';

import ProgressInspector from '../../../../js/src/blocks/Progress/Inspector';
import ProgressSave from '../../../../js/src/blocks/Progress/Save';

const { RangeControl } = wp.components;
const { RichText } = wp.editor;

describe( '<ProgressEdit />', () => {
	describe( 'should set description as expected', () => {
		const attributes= {
			description: 'Some description here.',
			max: 42,
			value: 23,
		};
		const setAttributes = jest.fn();

		const wrapper = shallow(
			<ProgressEdit attributes={ attributes } setAttributes={ setAttributes } />
		);
		const instance = wrapper.instance();

		const description = 'This is the new description.';
		instance.setDescription( description );

		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes ).toHaveBeenCalledWith( { description } );
	} );

	describe( 'should set max as expected', () => {
		const attributes= {
			description: 'Some description here.',
			max: 23,
			value: 0,
		};
		const setAttributes = jest.fn();

		const wrapper = shallow(
			<ProgressEdit attributes={ attributes } setAttributes={ setAttributes } />
		);
		const instance = wrapper.instance();

		const max = 42;
		instance.setMax( max );

		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes ).toHaveBeenCalledWith( { max } );
	} );

	describe( 'should limit value when setting lower max', () => {
		const attributes= {
			description: 'Some description here.',
			max: 42,
			value: 42,
		};
		const setAttributes = jest.fn();

		const wrapper = shallow(
			<ProgressEdit attributes={ attributes } setAttributes={ setAttributes } />
		);
		const instance = wrapper.instance();

		const max = 23;
		instance.setMax( max );

		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes ).toHaveBeenCalledWith( {
			max,
			value: max,
		} );
	} );

	describe( 'should set value as expected', () => {
		const attributes= {
			description: 'Some description here.',
			max: 42,
			value: 0,
		};
		const setAttributes = jest.fn();

		const wrapper = shallow(
			<ProgressEdit attributes={ attributes } setAttributes={ setAttributes } />
		);
		const instance = wrapper.instance();

		const value = 23;
		instance.setValue( value );

		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes ).toHaveBeenCalledWith( { value } );
	} );

	describe( 'should limit new value by defined max', () => {
		const max = 42;
		const attributes= {
			description: 'Some description here.',
			max,
			value: 0,
		};
		const setAttributes = jest.fn();

		const wrapper = shallow(
			<ProgressEdit attributes={ attributes } setAttributes={ setAttributes } />
		);
		const instance = wrapper.instance();

		const value = 123;
		instance.setValue( value );

		expect( setAttributes ).toHaveBeenCalledTimes( 1 );
		expect( setAttributes ).toHaveBeenCalledWith( { value: max } );
	} );

	describe( 'when not selected', () => {
		test( 'should render as expected', () => {
			const attributes = {
				description: 'Some description here.',
				max: 42,
				value: 23,
			};
			const wrapper = shallow(
				<ProgressEdit attributes={ attributes } isSelected={ false } setAttributes={ () => null } />
			);

			const save = wrapper.find( ProgressSave );
			expect( save ).toHaveLength( 1 );
			expect( save.props() ).toMatchObject( { attributes } );
		} );
	} );

	describe( 'when selected', () => {
		test( 'should render as expected', () => {
			const description = 'Some description here.';
			const max = 42;
			const value = 23;
			const attributes = {
				description,
				max,
				value,
			};
			const setAttributes = () => Symbol( 'setAttributes' );
			const wrapper = shallow(
				<ProgressEdit attributes={ attributes } isSelected={ true } setAttributes={ setAttributes } />
			);
			const instance = wrapper.instance();

			const inspector = wrapper.find( ProgressInspector );
			expect( inspector ).toHaveLength( 1 );
			expect( inspector.props() ).toMatchObject( {
				max,
				setMax: instance.setMax,
			} );

			const rangeControl = wrapper.find( RangeControl );
			expect( rangeControl ).toHaveLength( 1 );
			expect( rangeControl.props() ).toMatchObject( {
				max,
				min: '0',
				value,
				onChange: instance.setValue,
			} );

			const richText = wrapper.find( RichText );
			expect( richText ).toHaveLength( 1 );
			expect( richText.props() ).toMatchObject( {
				value: description,
				onChange: instance.setDescription,
			} );
		} );
	} );
} );
