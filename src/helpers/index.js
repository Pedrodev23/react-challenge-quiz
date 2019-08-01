export const uriDecodeHelper = function(encodedURI) {
    return encodedURI ? decodeURIComponent(encodedURI) : ''
}

export const shuffleArrayHelper = function(array) {
    return array.sort(() => Math.random() - 0.5 );
}

export const combineArrayHelper = function( parentArray, childArray ) {
    return parentArray.concat( childArray )
}