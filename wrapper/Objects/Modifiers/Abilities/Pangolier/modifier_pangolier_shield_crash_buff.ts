import { WrapperClassModifier } from "../../../../Decorators"
import { DAMAGE_TYPES } from "../../../../Enums/DAMAGE_TYPES"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_pangolier_shield_crash_buff extends Modifier {
	public readonly IsShield = true
	public readonly AbsorbDamageAfterReduction = true
	public readonly AbsorbDamageType = DAMAGE_TYPES.DAMAGE_TYPE_ALL

	protected SetAbsorbDamage(_specialName?: string, _subtract = false) {
		this.AbsorbDamage = Math.max(this.NetworkArmor, 0)
	}
}
