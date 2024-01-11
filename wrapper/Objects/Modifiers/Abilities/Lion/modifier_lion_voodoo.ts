import { WrapperClassModifier } from "../../../../Decorators"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_lion_voodoo extends Modifier {
	public readonly IsDebuff = true

	protected SetFixedMoveSpeed(specialName = "movespeed", subtract = false) {
		super.SetFixedMoveSpeed(specialName, subtract)
	}
}
