import { WrapperClassModifier } from "../../../../Decorators"
import { GameRules } from "../../../Base/Entity"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_night_stalker_hunter_in_the_night extends Modifier {
	public readonly IsBuff = true

	private get isNight(): boolean {
		if (GameRules?.IsNight) {
			return true
		}
		const buffName = "modifier_night_stalker_darkness"
		return this.Parent?.HasBuffByName(buffName) ?? false
	}

	protected SetMoveSpeedAmplifier(
		specialName = "bonus_movement_speed_pct_night",
		_subtract = false
	): void {
		const value = this.GetSpecialMoveSpeedByState(specialName)
		this.BonusMoveSpeedAmplifier = this.isNight ? value / 100 : 0
	}

	protected SetBonusAttackSpeed(
		specialName = "bonus_attack_speed_night",
		_subtract = false
	): void {
		const value = this.GetSpecialAttackSpeedByState(specialName)
		this.BonusAttackSpeed = this.isNight ? value : 0
	}
}
