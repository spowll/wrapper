import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("lina_laguna_blade")
export class lina_laguna_blade extends Ability {
	public GetMaxCooldownForLevel(level: number): number {
		return this.GetSpecialValue("AbilityCooldown", level)
	}

	public GetBaseDamageForLevel(level: number): number {
		return this.GetSpecialValue("damage", level)
	}
}
