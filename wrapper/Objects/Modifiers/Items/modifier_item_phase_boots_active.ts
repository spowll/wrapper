import { CModifierParams } from "../../../Base/CModifierParams"
import { WrapperClassModifier } from "../../../Decorators"
import { EModifierfunction } from "../../../Enums/EModifierfunction"
import { Modifier } from "../../Base/Modifier"

@WrapperClassModifier()
export class modifier_item_phase_boots_active extends Modifier {
	public readonly DeclaredFunction = new Map([
		[
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
			this.GetMoveSpeedBonusPercentage.bind(this)
		]
	])

	private cachedRangeSpeed = 0
	private cachedMeleeSpeed = 0

	protected GetMoveSpeedBonusPercentage(_params?: CModifierParams): number {
		return (this.Parent?.IsRanged ?? false)
			? this.cachedRangeSpeed
			: this.cachedMeleeSpeed
	}

	protected AddModifier(): boolean {
		this.UpdateValues()
		return super.AddModifier()
	}

	protected UpdateValues() {
		const name = "item_phase_boots"
		this.cachedMeleeSpeed = this.GetSpecialValue("phase_movement_speed", name)
		this.cachedRangeSpeed = this.GetSpecialValue("phase_movement_speed_range", name)
	}
}
