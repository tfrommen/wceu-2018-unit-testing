import React from 'react';

import {
	getRandomHeading,
	getRandomParagraph,
	getRandomSentence,
	__RewireAPI__ as TextRewireAPI
} from '../../../js/src/utils/text';

beforeEach( () => {
	__rewire_reset_all__();
} );

/**
 * Complete the tests of the functions found at /js/src/utils/text.js.
 *
 * The exercise is completed when all the tests pass. :)
 *
 * Potentially helpful documentation:
 * - https://facebook.github.io/jest/docs/en/expect.html
 * - https://facebook.github.io/jest/docs/en/using-matchers.html
 * - https://github.com/speedskater/babel-plugin-rewire/blob/master/README.md#named-and-top-level-function-rewiring
 */
describe( 'getRandomSentence', () => {
	const sentence = 'This is a fake sentence.';
	let getSentencesMock;

	beforeEach( () => {
		getSentencesMock = jest.fn( () => [ sentence ] );
		TextRewireAPI.__Rewire__( 'getSentences', getSentencesMock );
	} );

	/**
	 * TODO: Complete the test by filling in the missing values/variables.
	 */
	test( 'should return one of given sentences at random', () => {
		const text = 'This is a sentence.';
		const randomSentence = getRandomSentence( text );

		// Fill in the missing values/variables.
		expect( getSentencesMock ).toHaveBeenCalledTimes( /* TODO */ );
		expect( getSentencesMock ).toHaveBeenCalledWith( /* TODO */ );
		expect( randomSentence ).toBe( /* TODO */ );
	} );

	/**
	 * TODO: Complete the test by configuring a function mock.
	 */
	test( 'should return empty string for empty text', () => {
		// Fill in the correct value to fake an empty-text response.
		getSentencesMock.mockReturnValue( /* TODO */ );

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

	/**
	 * TODO: Complete the test by filling in the missing values/variabls, and fixing the matcher call.
	 */
	test( 'should return beginning of one of given sentences at random ', () => {
		const text = 'This is a sentence.';
		const randomHeading = getRandomHeading( text );

		// Fill in the missing values/variables.
		expect( getRandomSentenceMock ).toHaveBeenCalledTimes( /* TODO */ );
		expect( getRandomSentenceMock ).toHaveBeenCalledWith( /* TODO */ );
		expect( randomSentence ).toMatch( new RegExp( `^${ randomHeading }` ) );
		// Fix the matcher call. It should ensure that the sentence does NOT end with a comma etc.
		expect( randomHeading ).toMatch( /[,;.]$/ );
	} );
} );

describe( 'getRandomParagraph', () => {
	let getSentencesMock;

	beforeEach( () => {
		getSentencesMock = jest.fn();
		TextRewireAPI.__Rewire__( 'getSentences', getSentencesMock );
	} );

	/**
	 * TODO: Add the missing expectation.
	 */
	test( 'should return empty string for empty text', () => {
		// Fill in the missing value to make the function return an empty-text response by default.
		getSentencesMock.mockReturnValue( /* TODO */ );

		const randomParagraph = getRandomParagraph( '' );

		// Add missing expectation.
	} );

	/**
	 * TODO: Add the missing expectation(s).
	 */
	test( 'should return random paragraph from given (potentially repeated) text', () => {
		getSentencesMock.mockReturnValue( [
			'One.',
			'Two.',
			'Three.',
		] );

		const randomParagraph = getRandomParagraph( '' );

		const randomSentences = randomParagraph.split( '. ' );

		expect( randomParagraph ).toMatch( /(One. Two. Three.|Two. Three. One.|Three. One. Two.)/ );
		// Add expectation(s) for the number of sentences (i.e., should be in the defined range of 3 and 8).
	} );
} );
