const identifierRegex = /^[a-zA-Z_][0-9a-zA-Z_]*$/;

export function checkIdentifier(identifier) {
	return identifierRegex.test(identifier);
}