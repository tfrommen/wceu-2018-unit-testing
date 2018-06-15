import '../../__stubs__/wp';

import React from 'react';

import LoremIpsumInspector from '../../../../js/src/blocks/LoremIpsum/Inspector';

import { shallow } from 'enzyme';

const { SelectControl, ToggleControl, Toolbar } = wp.components;

describe( '<LoremIpsumInspector />', () => {
	describe( 'with passed heading level', () => {
		test( 'should render as expected', () => {
			const headingLevel = 'H2';
			const numberParagraphs = 3;

			const wrapper = shallow(
				<LoremIpsumInspector
					headingLevel={ headingLevel }
					numberParagraphs={ numberParagraphs }
					onChangeHeadingLevel={ () => {} }
					onChangeNumberParagraphs={ () => {} }
				/>
			);

			const selectControl = wrapper.find( SelectControl );
			expect( selectControl.length );
			expect( selectControl.props() ).toMatchObject( {
				options: expect.arrayContaining( [
					expect.objectContaining( { value: '1' } ),
					expect.objectContaining( { value: '2' } ),
					expect.objectContaining( { value: '3' } ),
					expect.objectContaining( { value: '4' } ),
					expect.objectContaining( { value: '5' } ),
					expect.objectContaining( { value: '6' } ),
					expect.objectContaining( { value: '7' } ),
					expect.objectContaining( { value: '8' } ),
					expect.objectContaining( { value: '9' } ),
				] ),
				value: numberParagraphs,
				onChange: expect.any( Function ),
			} );

			const toggleControl = wrapper.find( ToggleControl );
			expect( toggleControl.length );
			expect( toggleControl.props() ).toMatchObject( {
				checked: true,
				onChange: expect.any( Function ),
			} );

			const toolbar = wrapper.find( Toolbar );
			expect( toolbar.length );
			expect( toolbar.props() ).toMatchObject( {
				controls: expect.arrayContaining( [
					expect.objectContaining( {
						isActive: false,
						onClick: expect.any( Function ),
					} ),
					expect.objectContaining( {
						isActive: true,
						onClick: expect.any( Function ),
					} ),
					expect.objectContaining( {
						isActive: false,
						onClick: expect.any( Function ),
					} ),
					expect.objectContaining( {
						isActive: false,
						onClick: expect.any( Function ),
					} ),
					expect.objectContaining( {
						isActive: false,
						onClick: expect.any( Function ),
					} ),
					expect.objectContaining( {
						isActive: false,
						onClick: expect.any( Function ),
					} ),
				] ),
			} );
		} );
	} );

	describe( 'without heading level', () => {
		test( 'should render as expected', () => {
			const wrapper = shallow(
				<LoremIpsumInspector
					headingLevel={ '' }
					numberParagraphs={ 1 }
					onChangeHeadingLevel={ () => {} }
					onChangeNumberParagraphs={ () => {} }
				/>
			);

			const toggleControl = wrapper.find( ToggleControl );
			expect( toggleControl.length );
			expect( toggleControl.props().checked ).toBe( false );

			const toolbar = wrapper.find( Toolbar );
			expect( toolbar.length ).toBe( 0 );
		} );
	} );

	test( 'should properly handle selecting the number of paragraphs', () => {
		const onChangeNumberParagraphs = jest.fn();
		const wrapper = shallow(
			<LoremIpsumInspector
				headingLevel={ '' }
				numberParagraphs={ 1 }
				onChangeHeadingLevel={ () => {} }
				onChangeNumberParagraphs={ onChangeNumberParagraphs }
			/>
		);

		const selectControl = wrapper.find( SelectControl );

		const numberParagraphs = 42;
		selectControl.props().onChange( numberParagraphs );

		expect( onChangeNumberParagraphs ).toHaveBeenCalledTimes( 1 );
		expect( onChangeNumberParagraphs ).toHaveBeenCalledWith( numberParagraphs );
	} );

	test( 'should properly handle activating the heading', () => {
		const onChangeHeadingLevel = jest.fn();
		const wrapper = shallow(
			<LoremIpsumInspector
				headingLevel={ '' }
				numberParagraphs={ 1 }
				onChangeHeadingLevel={ onChangeHeadingLevel }
				onChangeNumberParagraphs={ () => {} }
			/>
		);

		const toggleControl = wrapper.find( ToggleControl );

		toggleControl.props().onChange( true );

		expect( onChangeHeadingLevel ).toHaveBeenCalledTimes( 1 );
		expect( onChangeHeadingLevel ).toHaveBeenCalledWith( 'H2' );
	} );

	test( 'should properly handle deactivating the heading', () => {
		const onChangeHeadingLevel = jest.fn();
		const wrapper = shallow(
			<LoremIpsumInspector
				headingLevel={ '' }
				numberParagraphs={ 1 }
				onChangeHeadingLevel={ onChangeHeadingLevel }
				onChangeNumberParagraphs={ () => {} }
			/>
		);

		const toggleControl = wrapper.find( ToggleControl );

		toggleControl.props().onChange( false );

		expect( onChangeHeadingLevel ).toHaveBeenCalledTimes( 1 );
		expect( onChangeHeadingLevel ).toHaveBeenCalledWith( '' );
	} );

	test( 'should properly handle setting the heading level', () => {
		const onChangeHeadingLevel = jest.fn();
		const wrapper = shallow(
			<LoremIpsumInspector
				headingLevel={ 'H2' }
				numberParagraphs={ 1 }
				onChangeHeadingLevel={ onChangeHeadingLevel }
				onChangeNumberParagraphs={ () => {} }
			/>
		);

		const toolbar = wrapper.find( Toolbar );
		toolbar.props().controls.forEach( ( control ) => {
			control.onClick();
		} );

		expect( onChangeHeadingLevel ).toHaveBeenCalledTimes( 6 );
		expect( onChangeHeadingLevel ).toHaveBeenCalledWith( 'H1' );
		expect( onChangeHeadingLevel ).toHaveBeenCalledWith( 'H2' );
		expect( onChangeHeadingLevel ).toHaveBeenCalledWith( 'H3' );
		expect( onChangeHeadingLevel ).toHaveBeenCalledWith( 'H4' );
		expect( onChangeHeadingLevel ).toHaveBeenCalledWith( 'H5' );
		expect( onChangeHeadingLevel ).toHaveBeenCalledWith( 'H6' );
	} );
} );
