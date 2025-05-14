/**
 * @swagger
 * components:
 *   schemas:
 *     TokenInfoDto:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the token.
 *           example: "Test ERC20 Coin"
 *         symbol:
 *           type: string
 *           description: The symbol of the token.
 *           example: "TE20"
 *         totalSupply:
 *           type: string
 *           description: The total supply of the token, as a string.
 *           example: "100000000000000000000"
 */
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
