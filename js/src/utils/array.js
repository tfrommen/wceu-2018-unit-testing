export function mapObjectsToProperty( data, propertyName ) {
	if ( ! Array.isArray( data ) ) {
		return [ data ];
	}

	return data.map( ( item ) => (
		typeof item === 'object' && propertyName in item
			? item[ propertyname ]
			: item
	) );
}
