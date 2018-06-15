/* global wp */

import React from 'react';
import PropTypes from 'prop-types';

const { PanelBody, SelectControl, ToggleControl, Toolbar } = wp.components;
const { InspectorControls } = wp.editor;
const { __, sprintf } = wp.i18n;

const LoremIpsumInspector = ( props ) => {
	const {
		headingLevel,
		numberParagraphs,
		onChangeHeadingLevel,
		onChangeNumberParagraphs,
	} = props;

	const hasHeading = Boolean( headingLevel );

	const toggleShowHeading = ( showHeading ) => {
		onChangeHeadingLevel( showHeading ? 'H2' : '' );
	};

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Lorem Ipsum Settings' ) }>
				<SelectControl
					label={ __( 'Paragraphs' ) }
					options={ '123456789'.split( '' ).map( ( value ) => ( {
						label: value,
						value,
					} ) ) }
					value={ numberParagraphs }
					onChange={ ( value ) => onChangeNumberParagraphs( Number( value ) ) }
				/>
				<ToggleControl
					checked={ hasHeading }
					label={ __( 'Show Heading' ) }
					onChange={ toggleShowHeading }
				/>
				{ hasHeading && (
					<Toolbar
						controls={ '123456'.split( '' ).map( ( level ) => ( {
							icon: 'heading',
							isActive: headingLevel === `H${ level }`,
							subscript: level,
							title: sprintf( __( 'Heading %s' ), level ),
							onClick: () => onChangeHeadingLevel( `H${ level }` ),
						} ) ) }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
};

LoremIpsumInspector.propTypes = {
	headingLevel: PropTypes.string,
	numberParagraphs: PropTypes.number.isRequired,
	onChangeHeadingLevel: PropTypes.func.isRequired,
	onChangeNumberParagraphs: PropTypes.func.isRequired,
};

export default LoremIpsumInspector;
