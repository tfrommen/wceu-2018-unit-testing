import data from '../../../../js/src/blocks/LoremIpsum/data';

describe( 'data', () => {
	test( 'should be a multi-line string', () => {
		expect( data ).toMatch( /\n/ );
	} );
} );
