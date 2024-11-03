import { GameState } from "../../Utils/GameState"
import { GameRules } from "../Base/Entity"
import { Unit } from "../Base/Unit"

export class UnitMoveSpeedManager {
	constructor(public readonly Owner: Unit) {}

	/**
	 * @description
	 * The night-time movement speed bonus.
	 * @url see: https://dota2.fandom.com/wiki/Movement_Speed
	 */
	public get NightTimeMoveSpeedBonus(): number {
		if (GameRules === undefined || !GameRules.IsNight) {
			return 0
		}

		const cooldown = 5 // hardcoded by valve
		const nightMoveSpeed = 15 * 2 // hardcoded by valve

		// All units now gain 15 movement speed during the night.
		// The effect is doubled for heroes, but it can be broken for seconds upon
		// attacking or taking damage from player-controlled sources.

		const rawGameTime = GameState.RawGameTime,
			lastDamageTime = this.Owner.LastDamageTime + cooldown,
			lastAttackTime = this.Owner.LastAttackTime + cooldown

		if (rawGameTime < lastAttackTime || rawGameTime < lastDamageTime) {
			return 0
		}

		return nightMoveSpeed
	}
}
