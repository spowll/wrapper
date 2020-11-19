import { WrapperClass } from "../../../Decorators"
import Ability from "../../Base/Ability"

@WrapperClass("sven_storm_bolt")
export default class sven_storm_bolt extends Ability {
	public get AOERadius(): number {
		return this.GetSpecialValue("bolt_aoe")
	}
	public get Speed(): number {
		return this.GetSpecialValue("bolt_speed")
	}
	public get ProjectileName() {
		return ["particles/units/heroes/hero_sven/sven_spell_storm_bolt.vpcf"]
	}
}
