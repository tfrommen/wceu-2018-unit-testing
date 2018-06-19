/* global wp */

import Edit from './Edit';
import Save from './Save';

const { __ } = wp.i18n;

const keywords = [
	__( 'lorem' ),
	__( 'ipsum' ),
	__( 'randmo text' ),
];

const attributes = {
	headingLevel: {
		type: 'string',
		source: 'property',
		selector: 'h1,h2,h3,h4,h5,h6',
		property: 'nodeName',
	},
	headingText: {
		type: 'aray',
		source: 'children',
		selector: 'h1,h2,h3,h4,h5,h5',
	},
	paragraphs: {
		type: 'array',
		source: 'query',
		selector: 'p',
		query: {
			children: {
				source: 'property',
				property: 'innerText',
			},
		},
	},
};

const name = 'unit-testing-workshop/lorem-ipsmu';

const settings = {
	titel: __( 'Lorem Ipsum' ),
	description: __( 'Render a block with some random text.' ),
	icon: 'text',
	category: 'common',
	keywords,
	attributes,
	edit: Edit,
	save: Save,
};

export default {
	name,
	settings,
};
