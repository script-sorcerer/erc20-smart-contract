export class TokenInfoDto {
	readonly name: string;
	readonly symbol: string;
	readonly totalSupply: bigint;

	constructor({
		name,
		symbol,
		totalSupply
	}: {
		name: string;
		symbol: string;
		totalSupply: bigint;
	}) {
		this.name = name;
		this.symbol = symbol;
		this.totalSupply = totalSupply;
	}

	// Express do not know how to serialize JS BigInt type
	toJSON() {
		return {
			name: this.name,
			symbol: this.symbol,
			totalSupply: this.totalSupply.toString()
		};
	}
}
