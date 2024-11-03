import { CModifierParams } from "../../../Base/CModifierParams"
import { WrapperClassModifier } from "../../../Decorators"
import { EModifierfunction } from "../../../Enums/EModifierfunction"
import { Item } from "../../Base/Item"
import { Modifier } from "../../Base/Modifier"

@WrapperClassModifier()
export class modifier_item_tranquil_boots extends Modifier {
	public readonly DeclaredFunction = new Map([
		[
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE,
			this.GetMoveSpeedBonusUnique.bind(this)
		]
	])

	private speedBonus = 0
	private breakCount = 0
	private speedBonusBroken = 0

	protected GetMoveSpeedBonusUnique(_params?: CModifierParams): number {
		const item = this.Ability as Nullable<Item>
		const isIllusion = this.Parent?.IsIllusion ?? false
		return item === undefined || item.CurrentCharges >= this.breakCount || isIllusion
			? this.speedBonusBroken
			: this.speedBonus
	}

	protected AddModifier(): boolean {
		this.UpdateValues()
		return super.AddModifier()
	}

	protected UpdateValues() {
		const name = "item_tranquil_boots"
		this.breakCount = this.GetSpecialValue("break_count", name)
		this.speedBonus = this.GetSpecialValue("bonus_movement_speed", name)
		this.speedBonusBroken = this.GetSpecialValue("broken_movement_speed", name)
	}
}
