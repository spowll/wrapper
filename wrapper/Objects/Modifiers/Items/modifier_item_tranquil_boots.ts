import { CModifierParams } from "../../../Base/CModifierParams"
import { WrapperClassModifier } from "../../../Decorators"
import { EModifierfunction } from "../../../Enums/EModifierfunction"
import { Item } from "../../Base/Item"
import { Modifier, ModifierFieldHandler } from "../../Base/Modifier"
import { AbilityData } from "../../DataBook/AbilityData"

@WrapperClassModifier()
export class modifier_item_tranquil_boots extends Modifier {
	private speedBonus = 0
	private breakCount = 0
	private speedBonusBroken = 0

	protected readonly DeclaredFunction: ModifierFieldHandler = new Map([
		[
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE,
			this.GetMoveSpeedBonusUnique.bind(this)
		]
	])

	protected GetMoveSpeedBonusUnique(_params: CModifierParams): number {
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
		const abilityName = this.Ability?.Name ?? "item_tranquil_boots",
			level = Math.max(this.Ability?.Level ?? this.AbilityLevel, 1),
			data = AbilityData.GetAbilityByName(abilityName)

		this.breakCount = data?.GetSpecialValue("break_count", level) ?? 0
		this.speedBonus = data?.GetSpecialValue("bonus_movement_speed", level) ?? 0
		this.speedBonusBroken = data?.GetSpecialValue("broken_movement_speed", level) ?? 0
	}
}
