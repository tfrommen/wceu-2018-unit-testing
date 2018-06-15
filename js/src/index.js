/* global wp */

import LoremIpsum from './blocks/LoremIpsum';
import Progress from './blocks/Progress';

const { registerBlockType } = wp.blocks;

[
	LoremIpsum,
	Progress,
].forEach( ( { name, settings } ) => {
	registerBlockType( name, settings );
} );
