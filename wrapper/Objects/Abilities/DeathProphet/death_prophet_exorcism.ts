import { WrapperClass } from "../../../Decorators"
import { Ability } from "../../Base/Ability"

@WrapperClass("death_prophet_exorcism")
export class death_prophet_exorcism extends Ability {
	public get Speed(): number {
		return this.GetSpecialValue("spirit_speed")
	}
	/**
	 * @param level
	 * @return {number}
	 */
	public GetAOERadiusForLevel(level: number): number {
		return this.GetSpecialValue("radius", level)
	}
}
