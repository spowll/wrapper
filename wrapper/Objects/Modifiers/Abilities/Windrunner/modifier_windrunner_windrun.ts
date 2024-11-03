import { CModifierParams } from "../../../../Base/CModifierParams"
import { WrapperClassModifier } from "../../../../Decorators"
import { EModifierfunction } from "../../../../Enums/EModifierfunction"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_windrunner_windrun extends Modifier {
	public readonly DeclaredFunction = new Map([
		[
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
			(_params?: CModifierParams) => this.cachedSpeed
		]
	])

	private cachedSpeed = 0

	protected AddModifier(): boolean {
		this.UpdateValues()
		return super.AddModifier()
	}

	protected UpdateValues() {
		this.cachedSpeed = this.GetSpecialValue(
			"movespeed_bonus_pct",
			"windrunner_windrun"
		)
	}
}
