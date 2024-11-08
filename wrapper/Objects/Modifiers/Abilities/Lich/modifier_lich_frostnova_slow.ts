import { WrapperClassModifier } from "../../../../Decorators"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_lich_frostnova_slow extends Modifier {
	public readonly IsDebuff = true

	public SetBonusAttackSpeed(
		specialName = "slow_attack_speed_primary",
		subtract = false
	): void {
		super.SetBonusAttackSpeed(specialName, subtract)
	}

	public SetMoveSpeedAmplifier(
		specialName = "slow_movement_speed",
		subtract = false
	): void {
		super.SetMoveSpeedAmplifier(specialName, subtract)
	}
}
