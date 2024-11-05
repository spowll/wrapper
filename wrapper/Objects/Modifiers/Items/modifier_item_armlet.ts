import { WrapperClassModifier } from "../../../Decorators"
import { Modifier } from "../../Base/Modifier"

@WrapperClassModifier()
export class modifier_item_armlet extends Modifier {
	protected SetBonusArmor(specialName = "bonus_armor", subtract = false): void {
		super.SetBonusArmor(specialName, subtract)
	}

	protected SetBonusAttackSpeed(specialName = "bonus_attack_speed", subtract = false) {
		super.SetBonusAttackSpeed(specialName, subtract)
	}
}