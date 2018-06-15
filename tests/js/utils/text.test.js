import React from 'react';

import {
	getRandomHeading,
	getRandomParagraph,
	getRandomSentence,
	getSentences,
	__RewireAPI__ as TextRewireAPI
} from '../../../js/src/utils/text';

beforeEach( () => {
	__rewire_reset_all__();
} );

describe( 'getSentences', () => {
	test( 'should return empty array for any non-string', () => {
		const text = 42;

		const expected = [];
		const actual = getSentences( text );

		expect( actual ).toEqual( expected );
	} );

	test( 'should return empty array for empty string', () => {
		const text = '';

		const expected = [];
		const actual = getSentences( text );

		expect( actual ).toEqual( expected );
	} );

	test( 'should return array with given sentence', () => {
		const text = 'This is one sentence.';

		const expected = [
			'This is one sentence.',
		];
		const actual = getSentences( text );

		expect( actual ).toEqual( expected );
	} );

	test( 'should return array with all given sentences', () => {
		const text = `
This is a sentence.
And there is another one.
  
Oh, and here is yet another sentence.
`;

		const expected = [
			'This is a sentence.',
			'And there is another one.',
			'Oh, and here is yet another sentence.',
		];
		const actual = getSentences( text );

		expect( actual ).toEqual( expected );
	} );
} );

describe( 'getRandomSentence', () => {
	const sentence = 'This is a sentence.';
	let getSentencesMock;

	beforeEach( () => {
		getSentencesMock = jest.fn( () => [ sentence ] );
		TextRewireAPI.__Rewire__( 'getSentences', getSentencesMock );
	} );

	test( 'should return one of given sentences at random', () => {
		const text = 'This is a sentence.';
		const randomSentence = getRandomSentence( text );

		expect( getSentencesMock ).toHaveBeenCalledTimes( 1 );
		expect( getSentencesMock ).toHaveBeenCalledWith( text );
		expect( randomSentence ).toBe( sentence );
	} );

	test( 'should return empty string for empty text', () => {
		getSentencesMock.mockReturnValue( [] );

		const randomSentence = getRandomSentence( '' );

		expect( randomSentence ).toBe( '' );
	} );
} );

describe( 'getRandomHeading', () => {
	const randomSentence = 'This is a sentence.';
	let getRandomSentenceMock;

	beforeEach( () => {
		getRandomSentenceMock = jest.fn( () => randomSentence );
		TextRewireAPI.__Rewire__( 'getRandomSentence', getRandomSentenceMock );
	} );

	test( 'should return beginning of one of given sentences at random ', () => {
		const text = 'This is a sentence.';
		const randomHeading = getRandomHeading( text );

		expect( getRandomSentenceMock ).toHaveBeenCalledTimes( 1 );
		expect( getRandomSentenceMock ).toHaveBeenCalledWith( text );
		expect( randomSentence ).toMatch( new RegExp( `^${ randomHeading }` ) );
		expect( randomHeading ).not.toMatch( /[,;.]$/ );
	} );
} );

describe( 'getRandomParagraph', () => {
	let getSentencesMock;

	beforeEach( () => {
		getSentencesMock = jest.fn( () => [] );
		TextRewireAPI.__Rewire__( 'getSentences', getSentencesMock );
	} );

	test( 'should return empty string for empty text', () => {
		const randomParagraph = getRandomParagraph( '' );

		expect( randomParagraph ).toBe( '' );
	} );

	test( 'should return random paragraph from given (potentially repeated) text', () => {
		getSentencesMock.mockReturnValue( [
			'One.',
			'Two.',
			'Three.',
		] );

		const randomParagraph = getRandomParagraph( '' );

		const randomSentences = randomParagraph.split( '. ' );

		expect( randomParagraph ).toMatch( /(One. Two. Three.|Two. Three. One.|Three. One. Two.)/ );
		expect( randomSentences.length ).toBeGreaterThanOrEqual( 3 );
		expect( randomSentences.length ).toBeLessThanOrEqual( 8 );
	} );
} );
