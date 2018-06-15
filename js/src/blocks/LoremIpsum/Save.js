import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { mapObjectsToProperty } from '../../utils/array';

const LoremIpsumSave = ( { attributes } ) => {
	const {
		headingLevel,
		headingText,
		paragraphs,
	} = attributes;

	const HeadingTag = String( headingLevel || '' ).toLowerCase();

	return (
		<Fragment>
			{ HeadingTag && headingText && (
				<HeadingTag>{ headingText }</HeadingTag>
			) }
			{ paragraphs && paragraphs.length > 0 && (
				mapObjectsToProperty( paragraphs, 'children' ).map( ( paragraph, index ) => (
					<p key={ `paragraph-${ index + 1 }` }>{ paragraph }</p>
				) )
			) }
		</Fragment>
	);
};

LoremIpsumSave.propTypes = {
	attributes: PropTypes.shape( {
		headingLevel: PropTypes.string,
		headingText: PropTypes.node,
		paragraphs: PropTypes.arrayOf(
			PropTypes.oneOfType( [
				PropTypes.node,
				PropTypes.shape( {
					children: PropTypes.node.isRequired,
				} ),
			] ),
		),
	} ),
};

LoremIpsumSave.defaultProps = {
	attributes: {},
};

export default LoremIpsumSave;
