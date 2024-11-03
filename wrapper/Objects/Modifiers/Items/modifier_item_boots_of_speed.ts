import { CModifierParams } from "../../../Base/CModifierParams"
import { WrapperClassModifier } from "../../../Decorators"
import { EModifierfunction } from "../../../Enums/EModifierfunction"
import { Modifier, ModifierFieldHandler } from "../../Base/Modifier"
import { AbilityData } from "../../DataBook/AbilityData"

@WrapperClassModifier()
export class modifier_item_boots_of_speed extends Modifier {
	private speedBonus = 0

	protected readonly DeclaredFunction: ModifierFieldHandler = new Map([
		[
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_UNIQUE,
			this.GetMoveSpeedBonusUnique.bind(this)
		]
	])

	protected GetMoveSpeedBonusUnique(_params: CModifierParams): number {
		return this.speedBonus
	}

	protected AddModifier(): boolean {
		this.UpdateValues()
		return super.AddModifier()
	}

	protected UpdateValues() {
		const abilityName = this.Ability?.Name ?? "item_boots",
			level = Math.max(this.Ability?.Level ?? this.AbilityLevel, 1),
			data = AbilityData.GetAbilityByName(abilityName)
		this.speedBonus = data?.GetSpecialValue("bonus_movement_speed", level) ?? 0
	}
}
