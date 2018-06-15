/* global wp */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Inspector from './Inspector';
import Save from './Save';

const { RangeControl } = wp.components;
const { RichText } = wp.editor;
const { __ } = wp.i18n;

class ProgressEdit extends Component {
	setDescription = ( description ) => {
		this.props.setAttributes( { description } );
	};

	setMax = ( max ) => {
		const {
			attributes,
			setAttributes,
		} = this.props;
		const newAttributes = {
			max
		};
		if ( max < attributes.value ) {
			newAttributes.value = max;
		}

		setAttributes( newAttributes );
	};

	setValue = ( value ) => {
		const {
			attributes,
			setAttributes,
		} = this.props;

		setAttributes( {
			value: Math.min( value, Number( attributes.max ) ),
		} );
	};

	render() {
		const {
			attributes,
			isSelected,
		} = this.props;

		if ( ! isSelected ) {
			return <Save attributes={ attributes } />;
		}

		const {
			description,
			max,
			value,
		} = attributes;

		return (
			<Fragment>
				<Inspector
					max={ max }
					setMax={ this.setMax }
				/>
				<RangeControl
					max={ max }
					min="0"
					value={ value }
					onChange={ this.setValue }
				/>
				<RichText
					placeholder={ __( 'Optional description…' ) }
					value={ description }
					onChange={ this.setDescription }
				/>
			</Fragment>
		);
	}
}

ProgressEdit.propTypes = {
	attributes: PropTypes.shape( {
		description: PropTypes.node,
		max: PropTypes.number.isRequired,
		value: PropTypes.number.isRequired,
	} ),
	isSelected: PropTypes.bool,
	setAttributes: PropTypes.func.isRequired,
};

export default ProgressEdit;
