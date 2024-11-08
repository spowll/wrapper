import { WrapperClassModifier } from "../../../Decorators"
import { Modifier } from "../../Base/Modifier"

@WrapperClassModifier()
export class modifier_item_sange_and_yasha extends Modifier {
	public readonly BonusAttackSpeedStack = true

	protected SetMoveSpeedAmplifier(
		specialName = "movement_speed_percent_bonus",
		subtract = false
	): void {
		super.SetMoveSpeedAmplifier(specialName, subtract)
	}

	protected SetBonusAttackSpeed(
		specialName = "bonus_attack_speed",
		subtract = false
	): void {
		super.SetBonusAttackSpeed(specialName, subtract)
	}

	protected SetStatusResistanceAmplifier(
		specialName = "status_resistance",
		subtract = false
	) {
		super.SetStatusResistanceAmplifier(specialName, subtract)
	}
}
