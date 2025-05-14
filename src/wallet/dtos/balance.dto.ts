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
