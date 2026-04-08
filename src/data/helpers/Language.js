export class Language {
	constructor(code) {
		this.code = code;
		this.displayName = '';
		this.description = '';
	}

	setDisplayName(value) { this.displayName = value; return this; }
	setDescription(value) { this.description = value; return this; }
}
