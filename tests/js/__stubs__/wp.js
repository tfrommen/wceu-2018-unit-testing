import React from 'react';

const RichText = jest.fn();
RichText.Content = jest.fn();

global.wp = {
	blocks: {
		registerBlockType: jest.fn(),
	},
	components: {
		PanelBody: jest.fn(),
		RangeControl: jest.fn(),
		SelectControl: jest.fn(),
		ToggleControl: jest.fn(),
		Toolbar: jest.fn(),
	},
	editor: {
		InspectorControls: jest.fn(),
		RichText,
	},
	i18n: {
		__: jest.fn( ( text ) => text ),
		sprintf: jest.fn( ( text, ...args ) => [ ...args ].reduce( ( text, arg ) => `${ text }|${ arg }`, text ) ),
	},
};
