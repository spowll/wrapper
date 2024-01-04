import { WrapperClassModifier } from "../../../../Decorators"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_windrunner_powershot_slow extends Modifier {
	public readonly IsDebuff = true

	protected SetMoveSpeedAmplifier(specialName = "slow", subtract = true): void {
		super.SetMoveSpeedAmplifier(specialName, subtract)
	}
}
