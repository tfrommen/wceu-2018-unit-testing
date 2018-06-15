import '../../__stubs__/wp';

import LoremIpsum from '../../../../js/src/blocks/LoremIpsum';

import LoremIpsumEdit from '../../../../js/src/blocks/LoremIpsum/Edit';
import LoremIpsumSave from '../../../../js/src/blocks/LoremIpsum/Save';
jest.mock( '../../../../js/src/blocks/LoremIpsum/Edit', () => Symbol( 'LoremIpsumEdit' ) );
jest.mock( '../../../../js/src/blocks/LoremIpsum/Save', () => Symbol( 'LoremIpsumSave' ) );

describe( 'LoremIpsum', () => {
	const { name, settings } = LoremIpsum;
	const { attributes } = settings;

	test( 'should have expected name', () => {
		expect( name ).toBe( 'unit-testing-workshop/lorem-ipsum' );
	} );

	test( 'should have expected settings', () => {
		const expected = {
			title: 'Lorem Ipsum',
			description: expect.any( String ),
			category: 'common',
			keywords: expect.arrayContaining( [
				'lorem',
				'ipsum',
				'random text',
			] ),
			edit: LoremIpsumEdit,
			save: LoremIpsumSave,
		};

		expect( settings ).toMatchObject( expected );
	} );

	test( 'should have expected attributes', () => {
		const expected = {
			headingLevel: {
				type: 'string',
			},
			headingText: {
				type: 'array',
			},
			paragraphs: {
				type: 'array',
			},
		};

		expect( attributes ).toMatchObject( expected );
		expect( attributes.headingLevel.selector ).toBe( attributes.headingText.selector );
	} );
} );
