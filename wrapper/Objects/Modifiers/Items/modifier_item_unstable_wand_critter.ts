import { WrapperClassModifier } from "../../../Decorators"
import { Modifier } from "../../Base/Modifier"

@WrapperClassModifier()
export class modifier_item_unstable_wand_critter extends Modifier {
	public readonly IsBuff = true

	protected SetBonusMoveSpeed(_specialName?: string, _subtract = false): void {
		// HARDCODED: no special data
		this.BonusMoveSpeedAmplifier = 10 / 100
	}
}
