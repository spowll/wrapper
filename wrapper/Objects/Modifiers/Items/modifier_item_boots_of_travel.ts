import { CModifierParams } from "../../../Base/CModifierParams"
import { WrapperClassModifier } from "../../../Decorators"
import { EModifierfunction } from "../../../Enums/EModifierfunction"
import { IModifier } from "../../../Managers/ModifierManager"
import { Modifier, ModifierFieldHandler } from "../../Base/Modifier"
import { AbilityData } from "../../DataBook/AbilityData"

@WrapperClassModifier()
export class modifier_item_boots_of_travel extends Modifier {
	private brokenMovementSpeed = 0

	protected readonly DeclaredFunction: ModifierFieldHandler = new Map([
		[
			EModifierfunction.MODIFIER_PROPERTY_HEALTH_BONUS,
			this.GetHealthBonus.bind(this)
		],
		[
			EModifierfunction.MODIFIER_PROPERTY_MOVESPEED_BONUS_PERCENTAGE,
			this.GetMoveSpeedBonusPercentage.bind(this)
		]
	])

	constructor(public kv: IModifier) {
		super(kv)

		this.brokenMovementSpeed =
			AbilityData.GetAbilityByName("item_boots_of_travel")?.GetSpecialValue(
				"broken_movement_speed",
				this.AbilityLevel
			) ?? 0
	}

	protected GetHealthBonus(_params: CModifierParams): number {
		return 0
	}

	protected GetMoveSpeedBonusPercentage(_params: CModifierParams): number {
		return this.brokenMovementSpeed
	}
}
