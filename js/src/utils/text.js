export function getSentences( text ) {
	if ( typeof text !== 'string' ) {
		return [];
	}

	return text.split( /[\n\r]+/ ).filter( ( sentence ) => /\S/.test( sentence ) );
}

export function getRandomSentence( text ) {
	const sentences = getSentences( text );
	if ( ! Array.isArray( sentences ) || ! sentences.length ) {
		return '';
	}

	return sentences[ Math.round( Math.random() * ( sentences.length - 1 ) ) ];
}

export function getRandomHeading( text ) {
	const sentence = getRandomSentence( text );
	const words = sentence.split( ' ' );
	const amount = Math.round( Math.random() * ( words.length - 1 ) ) + 1;

	return words.slice( 0, amount ).join( ' ' ).replace( /[,;.]+$/g, '' );
}

export function getRandomParagraph( text ) {
	const minSentences = 3;
	const maxSentences = 8;
	const numberSentences = minSentences + Math.round( Math.random() * ( maxSentences - minSentences ) );

	let sentences = getSentences( text );
	if ( ! sentences.length ) {
		return '';
	}

	while ( sentences.length < numberSentences ) {
		sentences = [ ...sentences, ...sentences ];
	}

	const start = Math.round( Math.random() * ( sentences.length - numberSentences ) );

	return sentences.slice( start, start + numberSentences ).join( ' ' );
}
