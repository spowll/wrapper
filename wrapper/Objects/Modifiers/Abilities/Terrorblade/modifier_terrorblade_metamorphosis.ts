import { WrapperClassModifier } from "../../../../Decorators"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_terrorblade_metamorphosis extends Modifier {
	public readonly IsBuff = true

	protected SetBonusAttackRange(specialName = "bonus_range", subtract = false): void {
		super.SetBonusAttackRange(specialName, subtract)
	}
}