import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Inspector from './Inspector';
import Save from './Save';

import { getRandomHeading, getRandomParagraph } from '../../utils/text';

import data from './data';

const generateHeading = () => getRandomHeading( data );
const generateParagraph = () => getRandomParagraph( data );

class LoremIpsumEdit extends Component {
	componentWillMount() {
		const { paragraphs } = this.props.attributes;
		if ( ! paragraphs || ! paragraphs.length ) {
			this.updateParagraphs( 1 );
		}
	}

	updateHeading = ( headingLevel ) => {
		this.props.setAttributes( {
			headingLevel,
			headingText: headingLevel ? generateHeading() : '',
		} );
	};

	updateParagraphs = ( numberParagraphs ) => {
		this.props.setAttributes( {
			paragraphs: Array.from( Array( numberParagraphs ).keys(), generateParagraph ),
		} );
	};

	render() {
		const { attributes } = this.props;

		const {
			headingLevel,
			paragraphs,
		} = attributes;

		return (
			<Fragment>
				<Inspector
					headingLevel={ headingLevel || '' }
					numberParagraphs={ paragraphs ? paragraphs.length : 1 }
					onChangeHeadingLevel={ this.updateHeading }
					onChangeNumberParagraphs={ this.updateParagraphs }
				/>
				<Save attributes={ attributes } />
			</Fragment>
		);
	}
}

LoremIpsumEdit.propTypes = {
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
	setAttributes: PropTypes.func.isRequired,
};

LoremIpsumEdit.defaultProps = {
	attributes: {},
};

export default LoremIpsumEdit;
