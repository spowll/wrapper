import { WrapperClassModifier } from "../../../Decorators"
import { Modifier } from "../../Base/Modifier"

@WrapperClassModifier()
export class modifier_sheepstick_debuff extends Modifier {
	protected SetFixedMoveSpeed(
		specialName = "sheep_movement_speed",
		subtract = false
	): void {
		super.SetFixedMoveSpeed(specialName, subtract)
	}
}
