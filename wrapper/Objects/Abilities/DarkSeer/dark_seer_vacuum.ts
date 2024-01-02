import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("dark_seer_vacuum")
export class dark_seer_vacuum extends Ability {
	/**
	 * @param level
	 * @return {number}
	 */
	public GetAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("radius", level)
	}
}
