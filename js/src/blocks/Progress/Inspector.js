/* global wp */

import React from 'react';
import PropTypes from 'prop-types';

const { PanelBody, RangeControl } = wp.components;
const { InspectorControls } = wp.editor;
const { __ } = wp.i18n;

const ProgressInspector = ( props ) => {
	const {
		max,
		setMax,
	} = props;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Progress Settings' ) }>
				<RangeControl
					label={ __( 'Maximum' ) }
					max=""
					min="0"
					value={ max }
					onChange={ setMax }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

ProgressInspector.propTypes = {
	max: PropTypes.number.isRequired,
	setMax: PropTypes.func.isRequired,
};

export default ProgressInspector;
