import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("dazzle_rain_of_vermin")
export class dazzle_rain_of_vermin extends Ability {
	/**
	 * @param level
	 * @return {number}
	 */
	public GetAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("radius", level)
	}
}
