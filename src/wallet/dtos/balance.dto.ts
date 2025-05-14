/**
 * @swagger
 * components:
 *   schemas:
 *     BalanceDto:
 *       type: object
 *       properties:
 *         current:
 *           type: string
 *           description: The actual balance.
 *           example: "100"
 *         blocked:
 *           type: string
 *           description: The blocked balance.
 *           example: "1"
 *         total:
 *           type: string
 *           description: The total amount of tokens.
 *           example: "100000000000000000000"
 */
export class BalanceDto {
	readonly current: bigint;
	readonly blocked: bigint;
	readonly total: bigint;

	constructor({ current, blocked, total }: { current: bigint; blocked: bigint; total: bigint }) {
		this.current = current;
		this.blocked = blocked;
		this.total = total;
	}

	// Express do not know how to serialize JS BigInt type
	toJSON() {
		return {
			current: this.current.toString(),
			blocked: this.blocked.toString(),
			total: this.total.toString()
		};
	}
}
