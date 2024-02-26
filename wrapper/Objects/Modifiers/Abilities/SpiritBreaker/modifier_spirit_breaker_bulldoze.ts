import { WrapperClassModifier } from "../../../../Decorators"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_spirit_breaker_bulldoze extends Modifier {
	protected SetMoveSpeedAmplifier(specialName = "movement_speed"): void {
		super.SetMoveSpeedAmplifier(specialName)
	}
	protected SetStatusResistanceAmplifier(
		specialName = "status_resistance",
		subtract = false
	) {
		super.SetStatusResistanceAmplifier(specialName, subtract)
	}
}
