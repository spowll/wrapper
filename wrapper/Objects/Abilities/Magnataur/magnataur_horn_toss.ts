import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("magnataur_horn_toss")
export class magnataur_horn_toss extends Ability {
	/**
	 * @param level
	 * @return {number}
	 */
	public GetBaseAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("radius", level)
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetBaseDamageForLevel(level: number): number {
		return this.GetSpecialValue("damage", level)
	}
}
