import { CModifierParams } from "../../../../Base/CModifierParams"
import { WrapperClassModifier } from "../../../../Decorators"
import { EModifierfunction } from "../../../../Enums/EModifierfunction"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_windrunner_easy_breezy extends Modifier {
	public readonly DeclaredFunction = new Map([
		[
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_ABSOLUTE_MIN,
			(_params?: CModifierParams) => this.cachedSpeedMin
		],
		[
			EModifierfunction.MODIFIER_PROPERTY_IGNORE_MOVESPEED_LIMIT,
			(_params?: CModifierParams) => this.cachedSpeedMax
		]
	])

	private cachedSpeedMin = 0
	private cachedSpeedMax = 0

	protected AddModifier(): boolean {
		this.UpdateValues()
		return super.AddModifier()
	}

	protected UpdateValues() {
		const name = "windrunner_easy_breezy"
		this.cachedSpeedMin = this.GetSpecialValue("min_movespeed", name)
		this.cachedSpeedMax = this.GetSpecialValue("max_movespeed", name)
	}
}
