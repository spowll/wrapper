import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("grimstroke_spirit_walk")
export class grimstroke_spirit_walk extends Ability {
	/**
	 * @param level
	 * @return {number}
	 */
	public GetAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("radius", level)
	}
}
