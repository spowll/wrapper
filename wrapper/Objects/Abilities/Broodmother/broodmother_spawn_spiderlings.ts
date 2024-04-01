import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("broodmother_spawn_spiderlings")
export class broodmother_spawn_spiderlings extends Ability {
	public GetBaseDamageForLevel(level: number): number {
		return this.GetSpecialValue("damage", level)
	}

	public GetBaseSpeedForLevel(level: number): number {
		return this.GetSpecialValue("projectile_speed", level)
	}
}
