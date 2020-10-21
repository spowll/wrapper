import Ability from "../../Base/Ability"
import { WrapperClass } from "../../../Decorators"

@WrapperClass("tinker_heat_seeking_missile")
export default class tinker_heat_seeking_missile extends Ability {
	public get Speed(): number {
		return this.GetSpecialValue("speed")
	}
	public get ProjectileName() {
		return ["particles/units/heroes/hero_tinker/tinker_missile.vpcf"]
	}
}
