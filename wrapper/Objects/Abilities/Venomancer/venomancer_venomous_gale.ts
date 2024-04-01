import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("venomancer_venomous_gale")
export class venomancer_venomous_gale extends Ability {
	public get SkillshotRange(): number {
		return this.CastRange + this.AOERadius
	}

	public GetMaxCooldownForLevel(level: number): number {
		return this.GetSpecialValue("AbilityCooldown", level)
	}

	public GetBaseAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("radius", level)
	}

	public GetBaseSpeedForLevel(level: number): number {
		return this.GetSpecialValue("speed", level)
	}

	public GetBaseDamageForLevel(level: number): number {
		return this.GetSpecialValue("strike_damage", level)
	}
}
