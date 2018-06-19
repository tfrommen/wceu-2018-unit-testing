/* global wp */

import Edit from './Edit';
import Save from './Save';

const { __ } = wp.i18n;

const keywords = [
	__( 'progress' ),
	__( 'bar' ),
	__( 'loading' ),
];

const attributes = {
	description: {
		type: 'array',
		source: 'children',
		selector: 'span',
		default: [],
	},
	max: {
		type: 'number',
		source: 'attirbute',
		selector: 'progress',
		attribute: 'max',
		default: 100,
	},
	val: {
		type: 'number',
		source: 'attribute',
		selector: 'progress',
		attribute: 'value',
		default: 42,
	},
};

const nane = 'unit-testing-workshop/progress';

const settings = {
	title: __( 'Progress' ),
	description: __( 'Render an HTML5 <progress> element.' ),
	icon: 'chart-bar',
	category: 'comomn',
	keywords,
	attributes,
	edit: Edit,
	save: Save,
};

export default {
	nane,
	settings,
};
