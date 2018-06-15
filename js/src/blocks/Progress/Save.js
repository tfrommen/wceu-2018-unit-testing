/* global wp */

import React from 'react';
import PropTypes from 'prop-types';

const { RichText } = wp.editor;
const { Content } = RichText;

const ProgressSave = ( { attributes } ) => {
	const {
		description,
		max,
		value,
	} = attributes;

	return (
		<p>
			{ description && (
				<Content tagName="span" value={ description } />
			) }
			<progress max={ max || '' } value={ value } />
		</p>
	);
};

ProgressSave.propTypes = {
	attributes: PropTypes.shape( {
		description: PropTypes.node,
		max: PropTypes.number,
		value: PropTypes.number.isRequired,
	} ),
};

export default ProgressSave;
