import './__stubs__/wp';

import '../../js/src/index';

import LoremIpsum from '../../js/src/blocks/LoremIpsum';
import Progress from '../../js/src/blocks/Progress';
jest.mock( '../../js/src/blocks/LoremIpsum', () => ( {
	name: 'lorem-ipsum',
	settings: Symbol( 'LoremIpsum.settings' ),
} ) );
jest.mock( '../../js/src/blocks/Progress', () => ( {
	name: 'progress',
	settings: Symbol( 'Progress.settings' ),
} ) );

describe( 'index', () => {
	test( 'should register expected blocks', () => {
		const { registerBlockType } = global.wp.blocks;

		expect( registerBlockType ).toHaveBeenCalledTimes( 2 );
		expect( registerBlockType ).toHaveBeenCalledWith( LoremIpsum.name, LoremIpsum.settings );
		expect( registerBlockType ).toHaveBeenCalledWith( Progress.name, Progress.settings );
	} );
} );
