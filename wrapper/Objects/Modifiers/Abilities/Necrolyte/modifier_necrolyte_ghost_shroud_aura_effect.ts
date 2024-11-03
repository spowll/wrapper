import { CModifierParams } from "../../../../Base/CModifierParams"
import { WrapperClassModifier } from "../../../../Decorators"
import { EModifierfunction } from "../../../../Enums/EModifierfunction"
import { Modifier } from "../../../Base/Modifier"

@WrapperClassModifier()
export class modifier_necrolyte_ghost_shroud_aura_effect extends Modifier {
	public readonly DeclaredFunction = new Map([
		[
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_REDUCTION_PERCENTAGE,
			(_params?: CModifierParams) => this.cachedSpeed
		]
	])

	private cachedSpeed = 0

	protected AddModifier(): boolean {
		this.UpdateValues()
		return super.AddModifier()
	}

	protected UpdateValues() {
		const name = "necrolyte_ghost_shroud"
		this.cachedSpeed = this.GetSpecialValue("movement_speed", name)
	}
}
